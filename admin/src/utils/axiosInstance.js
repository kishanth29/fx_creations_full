// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.fxcreationstudio.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); // use correct key here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
