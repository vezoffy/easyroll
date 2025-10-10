import api from './api';

export const getPayrolls = (employeeId) => {
  return api.get(`/api/employee/${employeeId}/payrolls`);
};

// Triggers the payroll calculation for all employees for a given period
export const calculatePayrollForPeriod = (payPeriod) => 
  api.post(`/api/payroll/calculate?payPeriod=${payPeriod}`);

// Finalizes the payroll run and processes payments
export const processPaymentsForPeriod = (payPeriod) => 
  api.post(`/api/payroll/process-payments?payPeriod=${payPeriod}`);