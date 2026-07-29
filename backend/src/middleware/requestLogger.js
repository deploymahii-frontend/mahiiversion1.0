import logger from "../monitoring/logger.js";

export function requestLogger(req, res, next) {

    logger.info({

        method: req.method,

        url: req.originalUrl,

        ip: req.ip

    });

    next();

}
