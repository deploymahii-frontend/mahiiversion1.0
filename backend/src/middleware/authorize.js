import ForbiddenError from "../shared/errors/ForbiddenError.js";

export function authorize(...allowedRoles) {

    return (req, res, next) => {

        if (!req.user) {
            return next(
                new ForbiddenError("Authentication required.")
            );
        }

        const rawRole = req.user.role?.name || req.user.role;
        const userRole = String(rawRole).toUpperCase();

        if (!allowedRoles.includes(userRole)) {
            return next(
                new ForbiddenError("Access denied.")
            );
        }

        next();

    };

}
