import axios from 'axios';

const HOST_API =
  'https://job-log-fndaada8cth3f8bh.australiacentral-01.azurewebsites.net/api';

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
