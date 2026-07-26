import api from "../../../../services/api";

const hrService = {
  getDashboard: async () => {
    const response = await api.get("/hr/dashboard");
    return response;
  },
};

export default hrService;
