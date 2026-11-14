import axiosInstance from "../axiosSetup";

export const getBuyers = async () => await axiosInstance.get("/buyers");

export const createBuyer = async (buyerData, imageFile) => {
  const fd = new FormData();
  Object.keys(buyerData).forEach(key => {
    if (buyerData[key] !== null && buyerData[key] !== undefined) {
      fd.append(key, buyerData[key]);
    }
  });
  if (imageFile) fd.append("photo", imageFile);
  return await axiosInstance.post("/buyers", fd);
};

export const updateBuyer = async (buyerData) => await axiosInstance.put(`/buyers/${buyerData.id}`, buyerData);
export const removeBuyer = async (id) => await axiosInstance.delete(`/buyers/${id}`);