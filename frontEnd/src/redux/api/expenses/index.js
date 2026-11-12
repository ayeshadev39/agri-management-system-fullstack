import axiosInstance from "../axiosSetup";

export const getExpenses = async () => await axiosInstance.get("/expenses");
export const createExpense = async (expense) => await axiosInstance.post("/expenses", expense);
export const removeExpense = async (id) => await axiosInstance.delete(`/expenses/${id}`);