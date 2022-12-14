import axios, { AxiosRequestConfig } from 'axios';

const baseURL = 'https://choloit.com/api/v1';

const api = axios.create({ baseURL, withCredentials: true });

api.interceptors.request.use((data: AxiosRequestConfig) => {
  data.headers!.Authorization = 'Bearer ' + localStorage.getItem('token');
  return data;
});

export default api;
