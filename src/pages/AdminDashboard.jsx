import React, { useEffect, useState } from 'react';
import { getAllEmployees, updateEmployee, deleteEmployee, createPayrollPolicy, updatePayrollPolicy } from '../services/adminService';
import AuthNavbar from '../components/auth/AuthNavbar';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Alert
} from '@mui/material';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [policy, setPolicy] = useState({ policyName: '', taxPercentage: '', hraPercentage: '', allowancesPercentage: '', paidLeaveDays: '' });
  const [policyId, setPolicyId] = useState(null);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to fetch employees.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleSave = async () => {
    await updateEmployee(selectedEmployee.id, selectedEmployee);
    setOpen(false);
    fetchEmployees();
  };

  const handlePolicySave = async () => {
    if (policyId) {
      await updatePayrollPolicy(policyId, policy);
    } else {
      await createPayrollPolicy(policy);
    }
    setPolicy({ policyName: '', taxPercentage: '', hraPercentage: '', allowancesPercentage: '', paidLeaveDays: '' });
    setPolicyId(null);
  };

  return (
    <>
      <AuthNavbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Admin/HR Dashboard</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Employees</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.firstName} {emp.lastName}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>${emp.salary}</TableCell>
                    <TableCell>
                      <Button variant="contained" size="small" sx={{ mr: 1 }} onClick={() => handleEdit(emp)}>Edit</Button>
                      <Button variant="contained" color="error" size="small" onClick={() => handleDelete(emp.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            <TextField label="First Name" value={selectedEmployee?.firstName || ''} onChange={e => setSelectedEmployee({ ...selectedEmployee, firstName: e.target.value })} fullWidth sx={{ mb: 2 }} />
            <TextField label="Last Name" value={selectedEmployee?.lastName || ''} onChange={e => setSelectedEmployee({ ...selectedEmployee, lastName: e.target.value })} fullWidth sx={{ mb: 2 }} />
            <TextField label="Email" value={selectedEmployee?.email || ''} onChange={e => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })} fullWidth sx={{ mb: 2 }} />
            <TextField label="Designation" value={selectedEmployee?.designation || ''} onChange={e => setSelectedEmployee({ ...selectedEmployee, designation: e.target.value })} fullWidth sx={{ mb: 2 }} />
            <TextField label="Salary" value={selectedEmployee?.salary || ''} onChange={e => setSelectedEmployee({ ...selectedEmployee, salary: e.target.value })} fullWidth sx={{ mb: 2 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Payroll Policy</Typography>
          <TextField label="Policy Name" value={policy.policyName} onChange={e => setPolicy({ ...policy, policyName: e.target.value })} sx={{ mr: 2 }} />
          <TextField label="Tax %" value={policy.taxPercentage} onChange={e => setPolicy({ ...policy, taxPercentage: e.target.value })} sx={{ mr: 2 }} />
          <TextField label="HRA %" value={policy.hraPercentage} onChange={e => setPolicy({ ...policy, hraPercentage: e.target.value })} sx={{ mr: 2 }} />
          <TextField label="Allowances %" value={policy.allowancesPercentage} onChange={e => setPolicy({ ...policy, allowancesPercentage: e.target.value })} sx={{ mr: 2 }} />
          <TextField label="Paid Leave Days" value={policy.paidLeaveDays} onChange={e => setPolicy({ ...policy, paidLeaveDays: e.target.value })} sx={{ mr: 2 }} />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handlePolicySave}>Save Policy</Button>
        </Box>
      </Container>
    </>
  );
};

export default AdminDashboard;
