import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import EmployeeDashboard from './EmplyeeDashboardPage';
import ManagerDashboard from './ManagerDashboard';
import AdminDashboard from './AdminDashboard';
import PayrollDashboard from './PayrollDashboard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  switch (user.designation) {
    case 'MANAGER':
      return <ManagerDashboard />;
    case 'ADMIN':
    case 'HR':
      return <AdminDashboard />;
    case 'PAYROLL_PROCESSOR':
      return <PayrollDashboard />;
    case 'EMPLOYEE':
    default:
      return <EmployeeDashboard />;
  }
};

export default Dashboard;
