import React from 'react';
import { Cylinder, CylinderStatus } from '../types';
import { QrCode, Filter, AlertOctagon } from 'lucide-react';

interface CylinderManagementProps {
  cylinders: Cylinder[];
}

export const CylinderManagement: React.FC<CylinderManagementProps> = ({ cylinders }) => {
  const getStatusColor = (status: CylinderStatus) => {
    switch (status) {
      case CylinderStatus.FULL: return 'bg-blue-100 text-blue-700';
      case CylinderStatus.EMPTY: return 'bg-slate-100 text-slate-700';
      case CylinderStatus.IN_USE: return 'bg-green-100 text-green-700';
      case CylinderStatus.MAINTENANCE: return 'bg-orange-100 text-orange-700';
      case CylinderStatus.EXPIRED: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">钢瓶档案管理</h1>
          <p className="text-slate-500 mt-1">全生命周期追踪与有效期管理</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
          <QrCode size={18} />
          <span>扫码录入</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">库存列表</h2>
          <button className="text-slate-500 hover:text-slate-700">
            <Filter size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">钢瓶编码</th>
                <th className="px-6 py-4">规格</th>
                <th className="px-6 py-4">当前状态</th>
                <th className="px-6 py-4">下次检验日期</th>
                <th className="px-6 py-4">当前位置</th>
                <th className="px-6 py-4">合规性</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cylinders.map((cyl) => {
                 const isNearExpiry = new Date(cyl.nextInspectionDate) < new Date('2024-01-01'); // Mock check
                 return (
                  <tr key={cyl.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-slate-700 flex items-center gap-2">
                      <QrCode size={16} className="text-slate-400" />
                      {cyl.code}
                    </td>
                    <td className="px-6 py-4">{cyl.spec}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(cyl.status)}`}>
                        {cyl.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-mono ${isNearExpiry ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                      {cyl.nextInspectionDate}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{cyl.location}</td>
                    <td className="px-6 py-4">
                      {isNearExpiry ? (
                        <div className="flex items-center gap-1 text-red-600 text-xs font-medium">
                          <AlertOctagon size={14} /> 需送检
                        </div>
                      ) : (
                        <div className="text-green-600 text-xs font-medium">正常</div>
                      )}
                    </td>
                  </tr>
                 )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
