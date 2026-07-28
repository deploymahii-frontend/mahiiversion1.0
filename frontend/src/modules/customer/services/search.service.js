// src/modules/customer/services/search.service.js

import API from "../auth/services/auth.service";

export const search = (query, params = {}) =>
    API.get("/shops/search", {
        params: {
            q: query,
            ...params,
        },
    });
