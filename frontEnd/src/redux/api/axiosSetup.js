import axios from "axios";

// ✅ Backend URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Har request ke sath JWT Token bhejein
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {}
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Agar Token expire ho jaye to logout kar dein
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!error.config.url.includes("/users/login")) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;