// src/modules/customer/services/home.service.js

import API from "../../auth/services/auth.service";

export const getHome = () =>

    API.get("/home");
