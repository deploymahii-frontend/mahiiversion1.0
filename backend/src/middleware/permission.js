import ForbiddenError from "../shared/errors/ForbiddenError.js";

export function permission(...requiredPermissions) {

    return (req, res, next) => {

        if (!req.user) {
            return next(
                new ForbiddenError("Authentication required.")
            );
        }

        const permissions =
            req.user.permissions || [];

        const hasPermission =
            requiredPermissions.every(permission =>
                permissions.includes(permission)
            );

        if (!hasPermission) {
            return next(
                new ForbiddenError("Insufficient permissions.")
            );
        }

        next();

    };

}
