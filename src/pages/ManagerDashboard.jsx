import React, { useEffect, useState } from 'react';
import {
  getPendingLeaveRequests,
  approveLeaveRequest,
  rejectLeaveRequest,
  getPayrollsForPeriod
} from '../services/managerService';
import AuthNavbar from '../components/auth/AuthNavbar';
import {
  Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Grid, Alert
} from '@mui/material';

const ManagerDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [payPeriod, setPayPeriod] = useState('');
  const [payrolls, setPayrolls] = useState([]);
  const [error, setError] = useState(null);

  const fetchLeaveRequests = async () => {
    try {
      const res = await getPendingLeaveRequests();
      setLeaveRequests(res.data);
    } catch (err) {
      setError('Failed to fetch leave requests.');
    }
  };

  const handleApprove = async (id) => {
    await approveLeaveRequest(id);
    fetchLeaveRequests();
  };

  const handleReject = async (id) => {
    await rejectLeaveRequest(id);
    fetchLeaveRequests();
  };

  const handleFetchPayrolls = async () => {
    try {
      const res = await getPayrollsForPeriod(payPeriod);
      setPayrolls(res.data);
    } catch (err) {
      setError('Failed to fetch payrolls.');
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <>
      <AuthNavbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Manager Dashboard</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Pending Leave Requests</Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>{req.employeeName || req.employee?.firstName + ' ' + req.employee?.lastName}</TableCell>
                    <TableCell>{new Date(req.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(req.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{req.reason}</TableCell>
                    <TableCell>{req.status}</TableCell>
                    <TableCell>
                      <Button color="success" variant="contained" size="small" sx={{ mr: 1 }} onClick={() => handleApprove(req.id)}>Approve</Button>
                      <Button color="error" variant="contained" size="small" onClick={() => handleReject(req.id)}>Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Typography variant="h6">Team Payrolls</Typography>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item>
              <TextField label="Pay Period (YYYY-MM)" value={payPeriod} onChange={e => setPayPeriod(e.target.value)} />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleFetchPayrolls}>Fetch Payrolls</Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Pay Period</TableCell>
                  <TableCell>Net Pay</TableCell>
                  <TableCell>Payment Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payrolls.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.employeeName || p.employee?.firstName + ' ' + p.employee?.lastName}</TableCell>
                    <TableCell>{p.payPeriod}</TableCell>
                    <TableCell>${p.netPay?.toFixed(2)}</TableCell>
                    <TableCell>{new Date(p.paymentDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default ManagerDashboard;
