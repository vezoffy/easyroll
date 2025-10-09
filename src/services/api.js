import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Check for a user session on initial load
const user = JSON.parse(sessionStorage.getItem('user'));
if (user && user.accessToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
}

export default api;