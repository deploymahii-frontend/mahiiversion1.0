// Shop Status
export const SHOP_STATUS = Object.freeze({
  DRAFT: "draft",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  SUSPENDED: "suspended",
});

// Verification Status
export const VERIFICATION_STATUS = Object.freeze({
  NOT_SUBMITTED: "not_submitted",
  UNDER_REVIEW: "under_review",
  VERIFIED: "verified",
  REJECTED: "rejected",
});

// Business Categories
export const SHOP_CATEGORIES = Object.freeze([
  "mess",
  "restaurant",
  "cafe",
  "hotel",
  "bakery",
  "fast_food",
  "street_food",
  "grocery",
  "medical",
  "stationery",
  "salon",
  "barber",
  "gym",
  "hostel",
  "pg",
  "laundry",
]);

// Days of Week
export const DAYS_OF_WEEK = Object.freeze([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

// Default Values
export const SHOP_DEFAULTS = Object.freeze({
  RATING: 0,
  TOTAL_REVIEWS: 0,
  TOTAL_ORDERS: 0,
  TOTAL_VIEWS: 0,
  MAX_GALLERY_IMAGES: 10,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_LOGO_SIZE_MB: 2,
  MAX_COVER_SIZE_MB: 5,
});
