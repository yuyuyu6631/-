import React from 'react';
import { User, Role } from '../types';
import { Shield, User as UserIcon, Truck, HardHat } from 'lucide-react';

interface UserManagementProps {
  users: User[];
}

export const UserManagement: React.FC<UserManagementProps> = ({ users }) => {
  const getRoleIcon = (role: Role) => {
    switch (role) {
      case Role.ADMIN: return <Shield size={16} className="text-purple-600" />;
      case Role.STATION_MANAGER: return <Shield size={16} className="text-blue-600" />;
      case Role.DELIVERY: return <Truck size={16} className="text-orange-600" />;
      case Role.INSPECTOR: return <HardHat size={16} className="text-red-600" />;
      default: return <UserIcon size={16} className="text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">用户与权限管理</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
          添加用户
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">姓名</th>
                <th className="px-6 py-4">角色 (权限组)</th>
                <th className="px-6 py-4">联系电话</th>
                <th className="px-6 py-4">地址/备注</th>
                <th className="px-6 py-4 text-right">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-600">{user.phone}</td>
                  <td className="px-6 py-4 text-slate-500">{user.address || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      正常
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
        <h4 className="font-bold mb-1">RBAC 权限说明:</h4>
        <ul className="list-disc pl-5 space-y-1 opacity-80">
          <li><strong>站长:</strong> 拥有除系统配置外的全站管理权限。</li>
          <li><strong>配送员:</strong> 仅可见分配给自己的订单及车辆关联钢瓶。</li>
          <li><strong>普通用户:</strong> 仅可查看个人订单、报修记录及公告。</li>
        </ul>
      </div>
    </div>
  );
};
