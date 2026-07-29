import api from "@/services/api";

export const searchApi = {
  search(payload) {
    return api.post("/search", payload).then((res) => res.data);
  },

  suggestions(query) {
    return api.get("/search/suggestions", { params: { q: query } }).then((res) => res.data);
  },

  trending() {
    return api.get("/search/trending").then((res) => res.data);
  },

  recent() {
    return api.get("/search/recent").then((res) => res.data);
  },
};
