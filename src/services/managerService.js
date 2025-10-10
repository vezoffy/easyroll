import api from './api';

export const getPendingLeaveRequests = () => 
  api.get('/api/manager/leave-requests');

export const approveLeaveRequest = (leaveRequestId) => 
  api.put(`/api/manager/leave-requests/${leaveRequestId}/approve`);

export const rejectLeaveRequest = (leaveRequestId) => 
  api.put(`/api/manager/leave-requests/${leaveRequestId}/reject`);

export const getPayrollsForPeriod = (period) => 
  api.get(`/api/manager/payrolls?period=${period}`);
