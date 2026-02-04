import axios from 'axios';
import { notifyError } from '@/helpers/notification';
const { VITE_API_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_URL + '/api',
  withCredentials: true,
});

api.interceptors.response.use(
  response => {
    return response.data?.result || response.data || response;
  },
  error => {
    notifyError(error);
    return Promise.reject(error);
  }
);

export default api;