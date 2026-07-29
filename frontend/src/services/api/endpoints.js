const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
    PROFILE: "/users/profile",
  },

  BUSINESS: {
    LIST: "/shops",
    SEARCH: "/shops/search",
    DETAILS: (slug) => `/shops/${slug}`,
  },

  PRODUCT: {
    LIST: "/products",
    DETAILS: (slug) => `/products/${slug}`,
    BY_BUSINESS: (shopId) => `/shops/${shopId}/products`,
  },

  CART: {
    GET: "/cart",
    ADD: "/cart/items",
    UPDATE: (itemId) => `/cart/items/${itemId}`,
    REMOVE: (itemId) => `/cart/items/${itemId}`,
    CLEAR: "/cart",
  },

  ORDER: {
    CREATE: "/orders",
    MY_ORDERS: "/orders/my",
    DETAILS: (id) => `/orders/${id}`,
  },
};

export default ENDPOINTS;
