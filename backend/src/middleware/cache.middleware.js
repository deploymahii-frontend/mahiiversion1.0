import redis from "../config/redis.js";

export function cache(ttl = 300) {

    return async (req, res, next) => {

        const key = req.originalUrl;

        const cached = await redis.get(key);

        if (cached) {

            return res.json(JSON.parse(cached));

        }

        const originalJson = res.json.bind(res);

        res.json = async (body) => {

            await redis.set(
                key,
                JSON.stringify(body),
                "EX",
                ttl
            );

            return originalJson(body);
        };

        next();
    };

}
