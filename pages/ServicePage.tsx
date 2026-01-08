import React from 'react';
import { Announcement } from '../types';
import { Megaphone, Phone, Wrench, Bell } from 'lucide-react';

interface ServicePageProps {
  announcements: Announcement[];
}

export const ServicePage: React.FC<ServicePageProps> = ({ announcements }) => {
  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold text-slate-900">服务与公告</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
             <Bell className="text-blue-500" /> 公告通知
          </div>
          {announcements.map(ann => (
            <div key={ann.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${ann.type === 'SAFETY' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                  {ann.type === 'SAFETY' ? '安全提示' : '系统通知'}
                </span>
                <span className="text-slate-400 text-xs">{ann.date}</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{ann.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{ann.content}</p>
            </div>
          ))}
        </div>

        {/* Quick Service Actions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
             <Wrench className="text-blue-500" /> 快捷服务
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors group">
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600">故障报修</h3>
                <p className="text-sm text-slate-500 mt-1">燃气灶具、管道问题上门维修</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Wrench size={24} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-green-300 transition-colors group">
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-green-600">电话咨询</h3>
                <p className="text-sm text-slate-500 mt-1">人工客服 24小时在线</p>
                <p className="text-lg font-mono font-bold text-slate-700 mt-1 group-hover:text-green-600">400-888-9999</p>
              </div>
              <div className="bg-green-50 p-3 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Phone size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
