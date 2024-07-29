import axios from 'axios';

const APIURL = 'http://localhost:7036';

const axiosInstance = axios.create({
  baseURL: APIURL,
});

export default axiosInstance;
