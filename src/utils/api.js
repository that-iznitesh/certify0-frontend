// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("auth")
//     ? JSON.parse(localStorage.getItem("auth")).token
//     : null;
//   if (token) {
//     config.headers.Authorization = token;
//   }
//   return config;
// });

// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")).token
    : null;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default API;
