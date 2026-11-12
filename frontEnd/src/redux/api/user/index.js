import axiosInstance from "../axiosSetup";

export const login = async (credentials) => {
  try {
    const res = await axiosInstance.post("/users/login", credentials);
    if (res.data.succeeded) {
      // ✅ Backend ka data LocalStorage me save karein
      const userData = {
        username: res.data.data.username,
        role: res.data.data.role,
        token: res.data.data.token
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return { data: { succeeded: true, data: userData } };
    }
    return { data: { succeeded: false, message: "Login failed" } };
  } catch (err) {
    return { data: { succeeded: false, message: err.response?.data?.message || "Login failed" } };
  }
};

export const logout = async () => {
  localStorage.removeItem("user");
  return { data: { succeeded: true } };
};

export const getSession = () => {
  try {
    const session = JSON.parse(localStorage.getItem("user"));
    return session ? { data: { succeeded: true, data: session } } : { data: { succeeded: false } };
  } catch {
    return { data: { succeeded: false } };
  }
};