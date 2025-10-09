import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const AuthNavbar = () => {
  const location = useLocation();
  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          EasyRoll
        </Typography>
        <Box>
          <Button
            color={location.pathname === '/login' ? 'secondary' : 'inherit'}
            component={Link}
            to="/login"
            sx={{ mr: 2 }}
            variant={location.pathname === '/login' ? 'contained' : 'text'}
          >
            Login
          </Button>
          <Button
            color={location.pathname === '/register' ? 'secondary' : 'inherit'}
            component={Link}
            to="/register"
            variant={location.pathname === '/register' ? 'contained' : 'text'}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AuthNavbar;
