import React, { useState } from 'react';
import { InspectionRecord, Role } from '../types';
import { ShieldCheck, AlertTriangle, FileText, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateSafetyAnalysis } from '../services/geminiService';

interface SafetyManagementProps {
  inspections: InspectionRecord[];
  currentUserRole: Role;
}

export const SafetyManagement: React.FC<SafetyManagementProps> = ({ inspections, currentUserRole }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await generateSafetyAnalysis(inspections);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">安全与应急管理</h1>
          <p className="text-slate-500 mt-1">入户安检记录与隐患台账</p>
        </div>
        {currentUserRole === Role.INSPECTOR && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <FileText size={18} />
            <span>新建安检记录</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inspection List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
               <h2 className="font-semibold text-slate-800">近期安检记录</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {inspections.map(record => (
                <div key={record.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-slate-800">{record.userName}</span>
                      <span className="text-slate-400 text-sm mx-2">|</span>
                      <span className="text-sm text-slate-500">安检员: {record.inspectorName}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{record.date}</span>
                  </div>
                  
                  {record.hasHazards ? (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 mt-2">
                      <div className="flex items-center gap-2 text-red-700 font-medium mb-1 text-sm">
                        <AlertTriangle size={16} />
                        <span>发现隐患 ({record.status === 'PENDING_RECTIFICATION' ? '待整改' : '已整改'})</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {record.hazards.map((h, idx) => (
                          <span key={idx} className="bg-white text-red-600 px-2 py-0.5 rounded text-xs border border-red-100">
                            {h}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-red-800 mt-2 opacity-80">{record.notes}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg mt-2 text-sm">
                      <ShieldCheck size={16} />
                      <span>检测合格</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Analysis Side Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-300" />
              <h2 className="text-lg font-bold">AI 智能安全官</h2>
            </div>
            <p className="text-indigo-100 text-sm mb-6">
              使用 Gemini 模型分析当前隐患数据，生成专业的整改建议与管理报告。
            </p>
            
            {!analysisResult && (
              <button 
                onClick={handleAIAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    正在分析...
                  </>
                ) : (
                  <>
                    生成安全周报
                  </>
                )}
              </button>
            )}

            {analysisResult && (
              <div className="bg-white/10 rounded-lg p-4 text-sm leading-relaxed max-h-[500px] overflow-y-auto custom-scrollbar border border-white/10">
                <ReactMarkdown className="prose prose-invert prose-sm">
                  {analysisResult}
                </ReactMarkdown>
                <button 
                  onClick={() => setAnalysisResult(null)}
                  className="text-xs text-indigo-200 mt-4 underline hover:text-white"
                >
                  重新生成
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
