import ForbiddenError from "../shared/errors/ForbiddenError.js";

function normalizeRole(role) {
  if (!role) return "";
  const r = String(role).toUpperCase().replace(/[^A-Z]/g, "");
  if (r === "SHOPOWNER" || r === "SHOP_OWNER" || r === "OWNER") return "SHOP_OWNER";
  if (r === "ADMIN" || r === "SUPERADMIN" || r === "SUPER_ADMIN") return "ADMIN";
  if (r === "CUSTOMER" || r === "USER") return "CUSTOMER";
  return r;
}

export function authorize(...allowedRoles) {
  const normalizedAllowed = allowedRoles.flatMap((role) => {
    const norm = normalizeRole(role);
    if (norm === "SHOP_OWNER") return ["SHOP_OWNER", "SHOPOWNER", "OWNER"];
    if (norm === "ADMIN") return ["ADMIN", "SUPERADMIN", "SUPER_ADMIN"];
    if (norm === "CUSTOMER") return ["CUSTOMER", "USER"];
    return [role, String(role).toUpperCase()];
  });

  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError("Authentication required."));
    }

    const rawRole = req.user.role?.name || req.user.role;
    const userRole = String(rawRole).toUpperCase();
    const userRoleNormalized = normalizeRole(rawRole);

    const isMatch =
      normalizedAllowed.includes(userRole) ||
      normalizedAllowed.includes(userRoleNormalized) ||
      userRoleNormalized === "ADMIN";

    if (!isMatch) {
      return next(new ForbiddenError("Access denied."));
    }

    next();
  };
}
