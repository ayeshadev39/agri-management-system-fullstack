import axiosInstance from "../axiosSetup";

export const getAttendance = async () => await axiosInstance.get("/attendance");
export const markAttendance = async (data) => await axiosInstance.post("/attendance", data);