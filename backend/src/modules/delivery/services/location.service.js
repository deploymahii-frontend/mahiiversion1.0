import locationRepository from "../repositories/location.repository.js";

class LocationService {
  async updateLocation(partnerId, payload) {
    return locationRepository.upsertByPartner(partnerId, payload);
  }

  async getLocationByAssignment(assignmentId) {
    return locationRepository.findByAssignment(assignmentId);
  }
}

export default new LocationService();
