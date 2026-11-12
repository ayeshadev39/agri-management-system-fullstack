import axiosInstance from "../axiosSetup";
export const getEquipment = async () => await axiosInstance.get("/equipment");
export const createEquipment = async (eq) => await axiosInstance.post("/equipment", eq);
export const updateEquipment = async (eq) => await axiosInstance.put(`/equipment/${eq.id}`, eq);
export const removeEquipment = async (id) => await axiosInstance.delete(`/equipment/${id}`);