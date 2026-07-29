import { redisClient } from "../config/redis.client.js";

export function cache(seconds) {

    return async (req, res, next) => {

        const key = req.originalUrl;

        const cached = await redisClient.get(key);

        if (cached) {

            return res.json(JSON.parse(cached));

        }

        const originalJson = res.json.bind(res);

        res.json = async (body) => {

            await redisClient.setEx(

                key,

                seconds,

                JSON.stringify(body)

            );

            return originalJson(body);

        };

        next();

    };

}
