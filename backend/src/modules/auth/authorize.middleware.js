function normalizeRole(role) {
  if (!role) return "";
  const r = String(role).toUpperCase().replace(/[_\s]/g, "");
  if (r === "SHOPOWNER" || r === "OWNER") return "SHOP_OWNER";
  if (r === "SUPERADMIN") return "SUPER_ADMIN";
  if (r === "USER") return "CUSTOMER";
  // Restore underscore for standard names
  if (r === "DELIVERYPARTNER") return "DELIVERY_PARTNER";
  return String(role).toUpperCase();
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const rawRole = req.user.role?.name || req.user.role;
    const userRole = normalizeRole(rawRole);

    // Admins always pass
    if (userRole === "SUPER_ADMIN" || userRole === "ADMIN") {
      return next();
    }

    const validRoles = roles
      .filter((r) => r !== undefined && r !== null)
      .map((r) => normalizeRole(r));

    if (!validRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of: ${roles.join(", ")}`,
      });
    }

    next();
  };
}
