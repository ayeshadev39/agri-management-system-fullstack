import axiosInstance from "../axiosSetup";

export const getOrders = async () => await axiosInstance.get("/orders");
export const createOrder = async (order) => await axiosInstance.post("/orders", order);
export const updateOrder = async (order) => await axiosInstance.put(`/orders/${order.id}`, order);
export const removeOrder = async (id) => await axiosInstance.delete(`/orders/${id}`);