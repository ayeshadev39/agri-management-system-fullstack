import axiosInstance from "../axiosSetup";

export const getBuyers = async () => await axiosInstance.get("/buyers");
export const createBuyer = async (buyer) => await axiosInstance.post("/buyers", buyer);
export const updateBuyer = async (buyer) => await axiosInstance.put(`/buyers/${buyer.id}`, buyer);
export const removeBuyer = async (id) => await axiosInstance.delete(`/buyers/${id}`);