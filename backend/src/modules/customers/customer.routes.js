import { Router } from "express";

const router = Router();

router.get("/dashboard", (req, res) => {
    return res.json({
        success: true,
        data: {
            recentOrders: [],
            favoriteShops: [],
            activeOffers: [],
            stats: { totalOrders: 0, rewardPoints: 0, activeCartItems: 0 }
        }
    });
});

router.get("/shop", (req, res) => {
    return res.json({
        success: true,
        data: []
    });
});

router.get("/:id", (req, res) => {
    return res.json({
        success: true,
        data: {
            _id: req.params.id,
            fullName: "Customer Profile",
            mobile: "9876543210",
            email: "customer@example.com",
            totalOrders: 0,
            totalSpent: 0
        }
    });
});

router.patch("/:id/block", (req, res) => {
    return res.json({
        success: true,
        message: "Customer blocked successfully"
    });
});

router.patch("/:id/unblock", (req, res) => {
    return res.json({
        success: true,
        message: "Customer unblocked successfully"
    });
});

export default router;
