import { Router } from "express";

const router = Router();

router.get("/dashboard", (req, res) => {
    return res.json({
        success: true,
        data: {
            todayOrders: 0,
            todayRevenue: 0,
            pendingOrders: 0,
            products: 0,
            rating: 5.0
        }
    });
});

router.get("/analytics/revenue", (req, res) => {
    return res.json({
        success: true,
        data: {
            daily: [],
            weekly: [],
            monthly: []
        }
    });
});

export default router;
