import axiosInstance from "../axiosSetup";

// ✅ Get All Crops
export const getCrops = async () => {
  return await axiosInstance.get("/crops");
};

// ✅ Create Crop
export const createCrop = async (crop) => {
  return await axiosInstance.post("/crops", crop);
};

// ✅ Update Crop (URL me crop ki ID bhej rahe hain)
export const updateCrop = async (crop) => {
  return await axiosInstance.put(`/crops/${crop.id}`, crop);
};

// ✅ Delete Crop
export const removeCrop = async (id) => {
  return await axiosInstance.delete(`/crops/${id}`);
};