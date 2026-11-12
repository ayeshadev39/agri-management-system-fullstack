import axiosInstance from "../axiosSetup";

export const getCrops = async () => {
  return await axiosInstance.get("/crops");
};

export const createCrop = async (crop) => {
  return await axiosInstance.post("/crops", crop);
};

export const updateCrop = async (crop) => {
  return await axiosInstance.put(`/crops/${crop.id}`, crop);
};

export const removeCrop = async (id) => {
  return await axiosInstance.delete(`/crops/${id}`);
};