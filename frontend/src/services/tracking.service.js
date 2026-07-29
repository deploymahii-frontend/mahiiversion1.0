// src/services/tracking.service.js

import api from "./api";

const trackingService = {
    getTracking(orderId) {
        return api.get(`/tracking/${orderId}`);
    },
    updateLocation(location) {
        return api.post("/tracking/location", location);
    },
    completeDelivery(orderId) {
        return api.patch(`/tracking/${orderId}/complete`);
    },
};

export default trackingService;
