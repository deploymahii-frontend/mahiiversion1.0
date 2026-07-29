import http from "./http";
import ENDPOINTS from "./endpoints";

/**
 * Get all businesses
 */
export const getBusinesses = (params = {}) =>
  http.get(ENDPOINTS.BUSINESS.LIST, { params });

/**
 * Search businesses
 */
export const searchBusinesses = (query) =>
  http.get(ENDPOINTS.BUSINESS.SEARCH, {
    params: { q: query },
  });

/**
 * Get business by slug
 */
export const getBusinessBySlug = (slug) =>
  http.get(ENDPOINTS.BUSINESS.DETAILS(slug));

export default {
  getBusinesses,
  searchBusinesses,
  getBusinessBySlug,
};
