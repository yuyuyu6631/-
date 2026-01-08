export enum Role {
  ADMIN = '管理员',
  STATION_MANAGER = '站长',
  DELIVERY = '配送员',
  INSPECTOR = '安检员',
  USER = '普通用户'
}

export enum CylinderStatus {
  FULL = '满瓶',
  EMPTY = '空瓶',
  IN_USE = '使用中',
  MAINTENANCE = '检修中',
  EXPIRED = '已报废'
}

export enum OrderStatus {
  PENDING = '待接单',
  ASSIGNED = '已分配',
  DELIVERING = '配送中',
  COMPLETED = '已完成',
  CANCELLED = '已取消'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  phone: string;
  address?: string; // For customers
}

export interface Cylinder {
  id: string;
  code: string; // QR code content
  spec: '5kg' | '15kg' | '50kg';
  status: CylinderStatus;
  lastInspectionDate: string;
  nextInspectionDate: string;
  location: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  address: string;
  spec: '5kg' | '15kg' | '50kg';
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  deliveryManId?: string;
  deliveryManName?: string;
  createdAt: string;
  cylinderCode?: string; // Assigned cylinder
}

export interface InspectionRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  inspectorName: string;
  hasHazards: boolean;
  hazards: string[]; // e.g., "Hose aging", "Poor ventilation"
  status: 'PENDING_RECTIFICATION' | 'RECTIFIED' | 'NORMAL';
  notes: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'NOTICE' | 'SAFETY' | 'PROMOTION';
  date: string;
}
