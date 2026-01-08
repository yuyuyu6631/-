import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { ShoppingBag, AlertTriangle, check, Clock, Archive } from 'lucide-react';
import { Order, Cylinder, CylinderStatus, OrderStatus, InspectionRecord } from '../types';

interface DashboardProps {
  orders: Order[];
  cylinders: Cylinder[];
  inspections: InspectionRecord[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#64748b'];

export const Dashboard: React.FC<DashboardProps> = ({ orders, cylinders, inspections }) => {
  // Stats Calculation
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === OrderStatus.PENDING).length;
  const hazardInspections = inspections.filter(i => i.hasHazards && i.status === 'PENDING_RECTIFICATION').length;
  const expiredCylinders = cylinders.filter(c => c.status === CylinderStatus.EXPIRED).length;

  // Chart Data Preparation
  const cylinderStatusData = [
    { name: '满瓶', value: cylinders.filter(c => c.status === CylinderStatus.FULL).length },
    { name: '使用中', value: cylinders.filter(c => c.status === CylinderStatus.IN_USE).length },
    { name: '空瓶', value: cylinders.filter(c => c.status === CylinderStatus.EMPTY).length },
    { name: '检修', value: cylinders.filter(c => c.status === CylinderStatus.MAINTENANCE).length },
    { name: '报废', value: cylinders.filter(c => c.status === CylinderStatus.EXPIRED).length },
  ];

  const orderTrendData = [
    { name: '周一', orders: 12 },
    { name: '周二', orders: 19 },
    { name: '周三', orders: 15 },
    { name: '周四', orders: 22 },
    { name: '周五', orders: 30 },
    { name: '周六', orders: 45 },
    { name: '周日', orders: 38 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">运营概览</h1>
          <p className="text-slate-500 mt-1">实时监控站点业务运行数据</p>
        </div>
        <span className="text-sm text-slate-400 bg-white px-3 py-1 rounded-full border shadow-sm">
          数据更新于: {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="今日订单" 
          value={totalOrders} 
          icon={ShoppingBag} 
          trend="+12%" 
          color="bg-blue-500" 
        />
        <StatCard 
          title="待处理订单" 
          value={pendingOrders} 
          icon={Clock} 
          trend="需要关注" 
          trendColor="text-orange-500"
          color="bg-orange-500" 
        />
        <StatCard 
          title="安全隐患" 
          value={hazardInspections} 
          icon={AlertTriangle} 
          trend="-2" 
          trendColor="text-green-500"
          color="bg-red-500" 
        />
        <StatCard 
          title="临期/报废钢瓶" 
          value={expiredCylinders} 
          icon={Archive} 
          trend="+1" 
          color="bg-slate-600" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Trend */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">近七日订单趋势</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cylinder Status */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">钢瓶状态分布</h3>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cylinderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {cylinderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-sm text-slate-600 flex-wrap">
            {cylinderStatusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span>{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color, trendColor = "text-slate-500" }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      <p className={`text-sm mt-2 font-medium ${trendColor}`}>
        {trend}
      </p>
    </div>
    <div className={`${color} p-3 rounded-lg text-white shadow-sm opacity-90`}>
      <Icon size={24} />
    </div>
  </div>
);
