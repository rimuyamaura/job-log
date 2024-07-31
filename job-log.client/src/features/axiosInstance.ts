import axios from 'axios';

const HOST_API = 'https://localhost:7036/api';

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.request.use(
  // Attach JWT token to requests for api authentication
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response) || 'General Axios Error has occurred'
    )
);

export default axiosInstance;
