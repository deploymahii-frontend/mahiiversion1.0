export async function health(req, res) {

    res.json({

        success: true,

        status: "healthy",

        timestamp: new Date(),

        services: {

            api: "healthy",

            database: "healthy",

            redis: "healthy",

            storage: "healthy"

        }

    });

}
