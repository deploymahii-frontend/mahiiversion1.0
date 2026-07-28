import { Router } from "express";

const router = Router();

router.get("/analytics", (req, res) => {
    return res.json({
        success: true,
        data: {
            totalProducts: 0,
            inStock: 0,
            lowStock: 0,
            outOfStock: 0,
            fastMoving: [],
            slowMoving: [],
            monthlyMovement: []
        }
    });
});

router.get("/export", (req, res) => {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=inventory-report.csv");
    return res.send("Product Name,Stock,Price\n");
});

export default router;
