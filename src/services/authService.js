import api from './api';

const signup = (userData) => {
  return api.post('/api/auth/signup', userData);
};

const login = async (credentials) => {
  const response = await api.post('/api/auth/signin', {
    email: credentials.email,
    password: credentials.password,
  });

  if (response.data.accessToken) {
    // Store user info and JWT in session storage
    sessionStorage.setItem('user', JSON.stringify(response.data));

    // Set the auth header for all subsequent requests
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
  }

  return response.data;
};

const logout = () => {
  // Remove user from storage
  sessionStorage.removeItem('user');
  // Remove the auth header
  delete api.defaults.headers.common['Authorization'];
};

const getCurrentUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;