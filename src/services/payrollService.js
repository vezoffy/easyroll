import api from './api';

export const getPayrolls = (employeeId) => {
  return api.get(`/api/employee/${employeeId}/payrolls`);
};