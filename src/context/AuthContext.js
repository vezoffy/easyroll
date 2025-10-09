import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import api from '../services/api';

// Corrected the endpoint to match the backend controller's RequestMapping
const getMe = () => {
    return api.get('/api/employee/me');
}

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      // Check for an existing user session on initial load
      const userStr = sessionStorage.getItem('user');
      if (userStr) {
          const user = JSON.parse(userStr);
          // Set the auth header for subsequent requests
          api.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
          try {
            const { data } = await getMe();
            setUser(data);
          } catch (error) {
            // Token might be expired, so log out
            authService.logout();
            setUser(null);
          }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    // The authService.login handles storing the user/token in sessionStorage
    await authService.login(credentials);
    // After a successful login, fetch the user data to update the context.
    const { data } = await getMe();
    setUser(data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // Redirect to login page after logout
    window.location.href = '/login';
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};