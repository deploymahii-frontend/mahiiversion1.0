export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const rawRole = req.user.role?.name || req.user.role;
    const userRole = typeof rawRole === "string" ? rawRole.toUpperCase() : "";

    if (userRole === "SUPER_ADMIN") {
      return next();
    }

    const validRoles = roles.filter(r => r !== undefined && r !== null);
    if (!validRoles.map((role) => role.toUpperCase()).includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of: ${validRoles.join(", ")}`,
      });
    }

    next();
  };
}
