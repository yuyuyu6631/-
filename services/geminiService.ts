import { GoogleGenAI } from "@google/genai";
import { InspectionRecord } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize client securely (assuming key is present)
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const generateSafetyAnalysis = async (inspections: InspectionRecord[]): Promise<string> => {
  if (!ai) {
    return "API Key 未配置，无法使用 AI 智能分析功能。";
  }

  // Filter only inspections with hazards for analysis to save tokens and focus context
  const hazardRecords = inspections.filter(i => i.hasHazards);
  
  if (hazardRecords.length === 0) {
    return "当前暂无未处理的安全隐患记录，整体安全状况良好。";
  }

  const prompt = `
    作为燃气公司的安全专家，请分析以下最近的用户安检隐患记录，并生成一份简要的安全管理建议周报。
    
    隐患数据:
    ${JSON.stringify(hazardRecords.map(r => ({
      hazards: r.hazards,
      status: r.status,
      notes: r.notes
    })))}

    要求:
    1. 总结主要存在的安全问题类型。
    2. 提供针对性的整改建议（针对管理层）。
    3. 语气专业、简洁。
    4. 输出为 Markdown 格式。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response needed
      }
    });
    return response.text || "未能生成分析结果。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 分析服务暂时不可用，请稍后重试。";
  }
};
