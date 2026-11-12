import axiosInstance from "../axiosSetup";

export const getTasks = async () => await axiosInstance.get("/tasks");
export const createTask = async (task) => await axiosInstance.post("/tasks", task);
export const updateTask = async (task) => await axiosInstance.put(`/tasks/${task.id}`, task);
export const removeTask = async (id) => await axiosInstance.delete(`/tasks/${id}`);