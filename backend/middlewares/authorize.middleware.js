import { ROLE_PERMISSIONS } from "../config/rolePermissions";

export function authorize(permission) {

    return (req, res, next) => {

        const role = req.user.role;

        const allowed =
            ROLE_PERMISSIONS[role]?.includes(permission);

        if (!allowed) {

            return res.status(403).json({

                success: false,

                message: "Permission denied."

            });

        }

        next();

    };

}
