import axios from 'axios';

// Function to get CSRF token from meta tag
const getMetaContent = (name: string): string | null => {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta ? meta.getAttribute('content') : null;
};

const paymentApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// Add request interceptor to include CSRF token
paymentApi.interceptors.request.use((config) => {
  // First try to get token from meta tag
  let token = getMetaContent('csrf-token');

  // If not found in meta, try to get from cookie
  if (!token) {
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (cookieToken) {
      // Decode the token since it's URL encoded in the cookie
      token = decodeURIComponent(cookieToken);
    }
  }

  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }

  return config;
});

// Add a request interceptor to refresh CSRF token if needed
paymentApi.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 419) {
      // CSRF token mismatch, try to refresh the page token
      try {
        await axios.get('/sanctum/csrf-cookie');
        // Retry the original request
        return paymentApi(error.config);
      } catch (e) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default paymentApi; 