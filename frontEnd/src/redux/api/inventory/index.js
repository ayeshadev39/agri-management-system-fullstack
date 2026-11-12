import axiosInstance from "../axiosSetup";

export const getInventory = async () => await axiosInstance.get("/inventory");
export const createItem = async (item) => await axiosInstance.post("/inventory", item);
export const updateItem = async (item) => await axiosInstance.put(`/inventory/${item.id}`, item);
export const removeItem = async (id) => await axiosInstance.delete(`/inventory/${id}`);