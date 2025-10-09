import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    designation: 'EMPLOYEE',
    salary: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { firstName, lastName, email, password, phone, designation, salary } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      setMessage('✅ Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('❌ Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f6fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Card sx={{ width: 500, p: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
            Register
          </Typography>

          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                  required
                  fullWidth
                />
              </Stack>

              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                fullWidth
              />

              <TextField
                label="Phone"
                type="text"
                name="phone"
                value={phone}
                onChange={onChange}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>Designation</InputLabel>
                <Select
                  name="designation"
                  value={designation}
                  label="Designation"
                  onChange={onChange}
                >
                  <MenuItem value="EMPLOYEE">Employee</MenuItem>
                  <MenuItem value="MANAGER">Manager</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="PAYROLL_PROCESSOR">Payroll Processor</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Salary"
                type="number"
                name="salary"
                value={salary}
                onChange={onChange}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 2, mt: 1 }}
                fullWidth
              >
                Register
              </Button>
            </Stack>
          </form>

          {message && (
            <Typography
              variant="body2"
              align="center"
              color={message.includes('successful') ? 'success.main' : 'error'}
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterForm;
