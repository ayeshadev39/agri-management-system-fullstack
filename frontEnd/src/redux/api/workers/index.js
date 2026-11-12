import axiosInstance from "../axiosSetup";
export const getWorkers = async () => await axiosInstance.get("/workers");
export const createWorker = async (worker) => await axiosInstance.post("/workers", worker);
export const updateWorker = async (worker) => await axiosInstance.put(`/workers/${worker.id}`, worker);
export const removeWorker = async (id) => await axiosInstance.delete(`/workers/${id}`);