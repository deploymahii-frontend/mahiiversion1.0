import deliveryRepository from "../repositories/delivery.repository.js";

class DeliveryService {
  constructor(repository) {
    this.repository = repository;
  }

  createPartner(data) {
    return this.repository.create(data);
  }

  getPartner(userId) {
    return this.repository.findByUser(userId);
  }

  getPartnerById(id) {
    return this.repository.findById(id);
  }

  updateOnlineStatus(id, online) {
    return this.repository.updateStatus(id, online);
  }

  updateCurrentLocation(id, location) {
    return this.repository.updateLocation(id, location);
  }
}

export default new DeliveryService(deliveryRepository);
