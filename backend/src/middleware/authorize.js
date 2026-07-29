import ForbiddenError from "../shared/errors/ForbiddenError.js";

export function authorize(...allowedRoles) {

    return (req, res, next) => {

        if (!req.user) {
            return next(
                new ForbiddenError("Authentication required.")
            );
        }

        const userRole =
            req.user.role?.name;

        if (!allowedRoles.includes(userRole)) {
            return next(
                new ForbiddenError("Access denied.")
            );
        }

        next();

    };

}
