export function auditAuthorization(

    req,

    res,

    next

) {

    if (!req.user) {

        console.warn("Unauthorized access", {

            path: req.originalUrl,

            ip: req.ip

        });

    }

    next();

}
