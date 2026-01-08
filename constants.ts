import { Role, CylinderStatus, OrderStatus, User, Cylinder, Order, InspectionRecord, Announcement } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: '张伟', role: Role.ADMIN, phone: '13800138001' },
  { id: 'u2', name: '李强', role: Role.STATION_MANAGER, phone: '13800138002' },
  { id: 'u3', name: '王大力', role: Role.DELIVERY, phone: '13800138003' },
  { id: 'u4', name: '赵安', role: Role.INSPECTOR, phone: '13800138004' },
  { id: 'u5', name: '陈阿姨', role: Role.USER, phone: '13900000001', address: '幸福小区 3号楼 201' },
  { id: 'u6', name: '刘先生', role: Role.USER, phone: '13900000002', address: '阳光花园 5号楼 502' },
];

export const MOCK_CYLINDERS: Cylinder[] = [
  { id: 'c1', code: 'GP-2023001', spec: '15kg', status: CylinderStatus.FULL, lastInspectionDate: '2023-01-01', nextInspectionDate: '2027-01-01', location: '总站仓库' },
  { id: 'c2', code: 'GP-2023002', spec: '15kg', status: CylinderStatus.IN_USE, lastInspectionDate: '2023-02-01', nextInspectionDate: '2027-02-01', location: '客户: 陈阿姨' },
  { id: 'c3', code: 'GP-2023003', spec: '50kg', status: CylinderStatus.EMPTY, lastInspectionDate: '2022-05-01', nextInspectionDate: '2026-05-01', location: '配送车: 王大力' },
  { id: 'c4', code: 'GP-2020099', spec: '15kg', status: CylinderStatus.MAINTENANCE, lastInspectionDate: '2020-01-01', nextInspectionDate: '2024-01-01', location: '检修中心' },
  { id: 'c5', code: 'GP-2019055', spec: '5kg', status: CylinderStatus.EXPIRED, lastInspectionDate: '2019-01-01', nextInspectionDate: '2023-01-01', location: '报废区' },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'o1', userId: 'u5', userName: '陈阿姨', address: '幸福小区 3号楼 201', spec: '15kg', quantity: 1, totalPrice: 120, status: OrderStatus.COMPLETED, deliveryManId: 'u3', deliveryManName: '王大力', createdAt: '2023-10-25 10:30', cylinderCode: 'GP-2023002' },
  { id: 'o2', userId: 'u6', userName: '刘先生', address: '阳光花园 5号楼 502', spec: '15kg', quantity: 1, totalPrice: 120, status: OrderStatus.DELIVERING, deliveryManId: 'u3', deliveryManName: '王大力', createdAt: '2023-10-26 09:15', cylinderCode: 'GP-2023001' },
  { id: 'o3', userId: 'u5', userName: '陈阿姨', address: '幸福小区 3号楼 201', spec: '5kg', quantity: 2, totalPrice: 100, status: OrderStatus.PENDING, createdAt: '2023-10-26 14:20' },
];

export const MOCK_INSPECTIONS: InspectionRecord[] = [
  { id: 'i1', userId: 'u5', userName: '陈阿姨', date: '2023-10-01', inspectorName: '赵安', hasHazards: false, hazards: [], status: 'NORMAL', notes: '用户用气环境良好，通风正常。' },
  { id: 'i2', userId: 'u6', userName: '刘先生', date: '2023-10-15', inspectorName: '赵安', hasHazards: true, hazards: ['软管老化', '未安装报警器'], status: 'PENDING_RECTIFICATION', notes: '已告知用户需更换软管，建议购买报警器。' },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: '关于冬季安全用气的温馨提示', content: '冬季门窗紧闭，使用燃气时请务必保持室内通风，防止一氧化碳中毒。', type: 'SAFETY', date: '2023-11-01' },
  { id: 'a2', title: '系统升级维护通知', content: '系统将于本周六凌晨 02:00 进行停机维护，预计时长 2 小时。', type: 'NOTICE', date: '2023-11-05' },
];
