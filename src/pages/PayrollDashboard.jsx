import React, { useState } from 'react';
import { calculatePayrollForPeriod, processPaymentsForPeriod } from '../services/payrollService';
import AuthNavbar from '../components/auth/AuthNavbar';
import {
  Container, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert
} from '@mui/material';

const PayrollDashboard = () => {
  const [payPeriod, setPayPeriod] = useState('');
  const [payrolls, setPayrolls] = useState([]);
  const [calculated, setCalculated] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    try {
      const res = await calculatePayrollForPeriod(payPeriod);
      setPayrolls(res.data);
      setCalculated(true);
      setMessage('Payroll calculated successfully.');
      setError('');
    } catch (err) {
      setError('Failed to calculate payroll.');
      setMessage('');
    }
  };

  const handleProcessPayments = async () => {
    try {
      await processPaymentsForPeriod(payPeriod);
      setMessage('Payments processed successfully.');
      setError('');
    } catch (err) {
      setError('Failed to process payments.');
      setMessage('');
    }
  };

  return (
    <>
      <AuthNavbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Payroll Processor Dashboard</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <Box sx={{ mb: 4 }}>
          <TextField label="Pay Period (YYYY-MM)" value={payPeriod} onChange={e => setPayPeriod(e.target.value)} sx={{ mr: 2 }} />
          <Button variant="contained" onClick={handleCalculate}>Calculate Payroll</Button>
          <Button variant="contained" color="success" sx={{ ml: 2 }} onClick={handleProcessPayments} disabled={!calculated}>Process Payments for Period</Button>
        </Box>
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
      </Container>
    </>
  );
};

export default PayrollDashboard;