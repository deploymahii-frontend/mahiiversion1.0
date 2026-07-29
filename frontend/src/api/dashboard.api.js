import api from "./axios";

export const getShopDashboard = async () => {
  const response = await api.get("/dashboard/shop");
  return response.data.data;
};
