import api from "@/services/api";

const supportService = {
  async getTickets() {
    const { data } = await api.get("/customer/support/tickets");
    return data.data;
  },

  async getFAQs() {
    const { data } = await api.get("/customer/support/faqs");
    return data.data;
  },

  async createTicket(payload) {
    const { data } = await api.post("/customer/support/tickets", payload);
    return data.data;
  },
};

export default supportService;
