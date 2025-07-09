import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  withCredentials: true,
});

// Request the CSRF cookie from Sanctum on initial load
api.get('/sanctum/csrf-cookie');

export default api;
