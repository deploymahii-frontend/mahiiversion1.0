export function sanitizeInput(req, res, next) {

    function clean(value) {

        if (typeof value === "string") {

            return value
                .trim()
                .replace(/[<>]/g, "");

        }

        return value;

    }

    Object.keys(req.body).forEach(key => {

        req.body[key] = clean(req.body[key]);

    });

    next();

}
