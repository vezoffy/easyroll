import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getLeaveRequests, submitLeaveRequest } from '../services/leaveService';
import { getPayrolls } from '../services/payrollService';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert
} from '@mui/material';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the leave request form
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const fetchDashboardData = async () => {
    if (user && user.id) {
      try {
        setLoading(true);
        setError(null);
        const [leaveRes, payrollRes] = await Promise.all([
          getLeaveRequests(user.id),
          getPayrolls(user.id)
        ]);
        setLeaveRequests(leaveRes.data);
        setPayrolls(payrollRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setError("Failed to load dashboard data. Please try refreshing the page.");
        setLeaveRequests([]);
        setPayrolls([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert("You must be logged in to submit a leave request.");
      return;
    }
    const leaveData = {
      startDate,
      endDate,
      reason,
      status: 'PENDING',
    };
    try {
      await submitLeaveRequest(user.id, leaveData);
      setStartDate('');
      setEndDate('');
      setReason('');
      fetchDashboardData(); // Refetch data
    } catch (err) {
      console.error("Failed to submit leave request", err);
      alert("Error submitting leave request. Please try again.");
    }
  };

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning">Please log in to view your dashboard.</Alert>
      </Container>
    );
  }

  return (
    <>
    
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">Dashboard</Typography>
          <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
        </Box>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Welcome, {user.firstName} {user.lastName}!
          </Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Designation:</strong> {user.designation}</Typography>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={4}>
            {/* Leave Request Form */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>Submit Leave Request</Typography>
                <Box component="form" onSubmit={handleLeaveSubmit} noValidate sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="start-date"
                        label="Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="end-date"
                        label="End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="reason"
                        label="Reason for Leave"
                        multiline
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Submit Request
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Leave Requests Table */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Your Leave Requests</Typography>
                {leaveRequests.length === 0 ? (
                  <Typography>No leave requests found.</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Start Date</TableCell>
                          <TableCell>End Date</TableCell>
                          <TableCell>Reason</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {leaveRequests.map((req) => (
                          <TableRow key={req.id}>
                            <TableCell>{new Date(req.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(req.endDate).toLocaleDateString()}</TableCell>
                            <TableCell>{req.reason}</TableCell>
                            <TableCell>{req.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Grid>

            {/* Payroll History Table */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Your Payroll History</Typography>
                {payrolls.length === 0 ? (
                  <Typography>No payroll history found.</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Pay Period</TableCell>
                          <TableCell>Payment Date</TableCell>
                          <TableCell>Basic Salary</TableCell>
                          <TableCell>HRA</TableCell>
                          <TableCell>Allowances</TableCell>
                          <TableCell>Deductions</TableCell>
                          <TableCell>Net Pay</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payrolls.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell>{p.payPeriod}</TableCell>
                            <TableCell>{new Date(p.paymentDate).toLocaleDateString()}</TableCell>
                            <TableCell>${p.basicSalary?.toFixed(2)}</TableCell>
                            <TableCell>${p.hra?.toFixed(2)}</TableCell>
                            <TableCell>${p.allowances?.toFixed(2)}</TableCell>
                            <TableCell>${p.deductions?.toFixed(2)}</TableCell>
                            <TableCell>${p.netPay?.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default DashboardPage;