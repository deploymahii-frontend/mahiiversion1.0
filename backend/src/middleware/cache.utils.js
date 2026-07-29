import redis from "../config/redis.js";

export async function clearShopCache() {

    const keys = await redis.keys("*shops*");

    if (keys.length) {

        await redis.del(keys);

    }

}
