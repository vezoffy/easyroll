import api from './api';

export const getAllEmployees = () => 
  api.get('/api/admin/employees');

export const updateEmployee = (employeeId, employeeData) => 
  api.put(`/api/admin/employees/${employeeId}`, employeeData);

export const deleteEmployee = (employeeId) => 
  api.delete(`/api/admin/employees/${employeeId}`);

export const createPayrollPolicy = (policyData) => 
  api.post('/api/admin/payroll/policies', policyData);

export const updatePayrollPolicy = (policyId, policyData) => 
  api.put(`/api/admin/payroll/policies/${policyId}`, policyData);
