import React, { useState } from 'react';
import { Order, OrderStatus, Role } from '../types';
import { Plus, Search, Truck, CheckCircle, Clock } from 'lucide-react';

interface OrderManagementProps {
  orders: Order[];
  currentUserRole: Role;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({ orders, currentUserRole, setOrders }) => {
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL');

  const filteredOrders = orders.filter(o => {
    // If delivery man, only show their orders or unassigned ones (for claiming - simplified)
    if (currentUserRole === Role.DELIVERY) {
      return o.status !== OrderStatus.CANCELLED && (o.deliveryManId === 'u3' || o.status === OrderStatus.PENDING); // u3 is mock delivery ID
    }
    // If user, only show their orders
    if (currentUserRole === Role.USER) {
      return o.userId === 'u5'; // u5 is mock current user ID
    }
    return filter === 'ALL' ? true : o.status === filter;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return <span className="px-2 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-700">待接单</span>;
      case OrderStatus.ASSIGNED: return <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">已分配</span>;
      case OrderStatus.DELIVERING: return <span className="px-2 py-1 rounded text-xs font-semibold bg-indigo-100 text-indigo-700">配送中</span>;
      case OrderStatus.COMPLETED: return <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">已完成</span>;
      default: return <span className="px-2 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const handleAction = (orderId: string, action: 'ASSIGN' | 'DELIVER' | 'COMPLETE') => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      if (action === 'ASSIGN') return { ...o, status: OrderStatus.ASSIGNED, deliveryManName: '王大力', deliveryManId: 'u3' };
      if (action === 'DELIVER') return { ...o, status: OrderStatus.DELIVERING };
      if (action === 'COMPLETE') return { ...o, status: OrderStatus.COMPLETED };
      return o;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">订单管理</h1>
        {(currentUserRole === Role.ADMIN || currentUserRole === Role.USER) && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus size={18} />
            <span>新建订单</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {['ALL', ...Object.values(OrderStatus)].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                filter === status 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'ALL' ? '全部订单' : status}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索订单号/姓名..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">订单号</th>
                <th className="px-6 py-4">客户信息</th>
                <th className="px-6 py-4">规格/数量</th>
                <th className="px-6 py-4">总价</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4">配送员</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-600">#{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{order.userName}</div>
                    <div className="text-xs text-slate-500 truncate max-w-[150px]">{order.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{order.spec}</span>
                    <span className="text-slate-400 mx-1">x</span>
                    <span>{order.quantity}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">¥{order.totalPrice}</td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4 text-slate-600">{order.deliveryManName || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {currentUserRole === Role.STATION_MANAGER && order.status === OrderStatus.PENDING && (
                        <button 
                          onClick={() => handleAction(order.id, 'ASSIGN')}
                          className="text-blue-600 hover:text-blue-700 font-medium text-xs border border-blue-200 px-2 py-1 rounded bg-blue-50"
                        >
                          分配
                        </button>
                      )}
                      {currentUserRole === Role.DELIVERY && order.status === OrderStatus.ASSIGNED && (
                        <button 
                          onClick={() => handleAction(order.id, 'DELIVER')}
                          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium text-xs border border-indigo-200 px-2 py-1 rounded bg-indigo-50"
                        >
                          <Truck size={12} /> 配送
                        </button>
                      )}
                       {currentUserRole === Role.DELIVERY && order.status === OrderStatus.DELIVERING && (
                        <button 
                          onClick={() => handleAction(order.id, 'COMPLETE')}
                          className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-xs border border-green-200 px-2 py-1 rounded bg-green-50"
                        >
                          <CheckCircle size={12} /> 签收
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                    暂无相关订单记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
