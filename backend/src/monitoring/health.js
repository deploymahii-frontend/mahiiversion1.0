import express from "express";

const router = express.Router();

router.get("/health", async (req, res) => {

    res.json({

        status: "healthy",

        uptime: process.uptime(),

        memory: process.memoryUsage(),

        timestamp: new Date()

    });

});

export default router;
