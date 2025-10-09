import api from './api';

export const submitLeaveRequest = (employeeId, leaveRequest) =>
  api.post(`/api/employee/${employeeId}/leave-requests`, leaveRequest);

export const getLeaveRequests = (employeeId) =>
  api.get(`/api/employee/${employeeId}/leave-requests`);
