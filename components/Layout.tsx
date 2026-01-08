import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Database, 
  ShieldAlert, 
  Users, 
  Megaphone,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentUserRole: Role;
  onSwitchRole: (role: Role) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const NavItem = ({ to, icon: Icon, label, onClick }: { to: string, icon: any, label: string, onClick?: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
      }`
    }
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </NavLink>
);

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentUserRole, 
  onSwitchRole,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  // Simple RBAC logic for menu items
  const canAccess = (allowedRoles: Role[]) => allowedRoles.includes(currentUserRole);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-xl font-bold text-slate-800">GasGuardian</span>
          <button 
            className="ml-auto lg:hidden text-slate-500"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            主菜单
          </div>
          
          <NavItem to="/" icon={LayoutDashboard} label="数据概览" onClick={() => setIsSidebarOpen(false)} />
          
          {canAccess([Role.ADMIN, Role.STATION_MANAGER, Role.DELIVERY, Role.USER]) && (
            <NavItem to="/orders" icon={ShoppingCart} label="订单管理" onClick={() => setIsSidebarOpen(false)} />
          )}
          
          {canAccess([Role.ADMIN, Role.STATION_MANAGER, Role.DELIVERY]) && (
            <NavItem to="/cylinders" icon={Database} label="钢瓶管理" onClick={() => setIsSidebarOpen(false)} />
          )}
          
          {canAccess([Role.ADMIN, Role.STATION_MANAGER, Role.INSPECTOR, Role.DELIVERY]) && (
            <NavItem to="/safety" icon={ShieldAlert} label="安全与应急" onClick={() => setIsSidebarOpen(false)} />
          )}
          
          {canAccess([Role.ADMIN, Role.STATION_MANAGER]) && (
            <NavItem to="/users" icon={Users} label="用户与权限" onClick={() => setIsSidebarOpen(false)} />
          )}
          
          <NavItem to="/service" icon={Megaphone} label="服务与公告" onClick={() => setIsSidebarOpen(false)} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-10">
          <button 
            className="lg:hidden text-slate-600 p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
             {/* Role Switcher for Demo */}
             <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">当前视角:</span>
              <select 
                value={currentUserRole}
                onChange={(e) => onSwitchRole(e.target.value as Role)}
                className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                {Object.values(Role).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm">
                {currentUserRole.charAt(0)}
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-bold text-slate-800">当前用户</div>
                <div className="text-xs text-slate-500">{currentUserRole}</div>
              </div>
            </div>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
