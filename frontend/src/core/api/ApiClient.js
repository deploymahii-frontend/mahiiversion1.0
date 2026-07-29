import api from "./interceptors";

class ApiClient {
  get(url, config = {}) {
    return api.get(url, config);
  }

  post(url, data = {}, config = {}) {
    return api.post(url, data, config);
  }

  put(url, data = {}, config = {}) {
    return api.put(url, data, config);
  }

  patch(url, data = {}, config = {}) {
    return api.patch(url, data, config);
  }

  delete(url, config = {}) {
    return api.delete(url, config);
  }
}

export default new ApiClient();
