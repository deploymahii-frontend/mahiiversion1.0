/**
 * Convert shop name to SEO-friendly slug
 * Example:
 * "Shree Mess" -> "shree-mess"
 */
export const generateSlug = (name = "") => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/**
 * Generate unique slug
 * Example:
 * shree-mess -> shree-mess-2
 */
export const generateUniqueSlug = (slug, count = 0) => {
  return count > 0 ? `${slug}-${count}` : slug;
};

/**
 * Normalize phone number
 * Example:
 * +91 98765 43210 -> 9876543210
 */
export const normalizePhone = (phone = "") => {
  return phone.replace(/\D/g, "").slice(-10);
};

/**
 * Calculate profile completion percentage
 */
export const calculateProfileCompletion = (shop) => {
  const fields = [
    shop.name,
    shop.logo,
    shop.cover,
    shop.description,
    shop.phone,
    shop.address?.addressLine,
    shop.address?.city,
    shop.address?.state,
    shop.businessHours?.length,
  ];

  const completed = fields.filter(Boolean).length;

  return Math.round((completed / fields.length) * 100);
};

/**
 * Generate shop code
 * Example:
 * MHI-000001
 */
export const generateShopCode = (id) => {
  return `MHI-${String(id).padStart(6, "0")}`;
};
