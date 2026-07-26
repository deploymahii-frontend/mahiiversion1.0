export function metrics(req, res, next) {

    const start = Date.now();

    res.on("finish", () => {

        const duration = Date.now() - start;

        console.log({

            method: req.method,

            route: req.originalUrl,

            status: res.statusCode,

            duration

        });

    });

    next();

}
