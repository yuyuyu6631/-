import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { OrderManagement } from './pages/OrderManagement';
import { CylinderManagement } from './pages/CylinderManagement';
import { SafetyManagement } from './pages/SafetyManagement';
import { UserManagement } from './pages/UserManagement';
import { ServicePage } from './pages/ServicePage';

// Data Types & Mocks
import { 
  Role, 
  Order, 
  Cylinder, 
  User, 
  InspectionRecord, 
  Announcement 
} from './types';
import { 
  MOCK_ORDERS, 
  MOCK_CYLINDERS, 
  MOCK_USERS, 
  MOCK_INSPECTIONS, 
  MOCK_ANNOUNCEMENTS 
} from './constants';

const App: React.FC = () => {
  // Global State (Simulating Database)
  const [currentUserRole, setCurrentUserRole] = useState<Role>(Role.STATION_MANAGER);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [cylinders] = useState<Cylinder[]>(MOCK_CYLINDERS);
  const [users] = useState<User[]>(MOCK_USERS);
  const [inspections] = useState<InspectionRecord[]>(MOCK_INSPECTIONS);
  const [announcements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <Layout 
        currentUserRole={currentUserRole} 
        onSwitchRole={setCurrentUserRole}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      >
        <Routes>
          <Route path="/" element={
            <Dashboard 
              orders={orders} 
              cylinders={cylinders} 
              inspections={inspections} 
            />
          } />
          
          <Route path="/orders" element={
            <OrderManagement 
              orders={orders} 
              setOrders={setOrders} 
              currentUserRole={currentUserRole} 
            />
          } />
          
          <Route path="/cylinders" element={
            currentUserRole === Role.USER 
              ? <Navigate to="/" replace /> 
              : <CylinderManagement cylinders={cylinders} />
          } />
          
          <Route path="/safety" element={
            currentUserRole === Role.USER 
              ? <Navigate to="/" replace /> 
              : <SafetyManagement inspections={inspections} currentUserRole={currentUserRole} />
          } />
          
          <Route path="/users" element={
             (currentUserRole === Role.ADMIN || currentUserRole === Role.STATION_MANAGER)
              ? <UserManagement users={users} />
              : <Navigate to="/" replace />
          } />
          
          <Route path="/service" element={
            <ServicePage announcements={announcements} />
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
