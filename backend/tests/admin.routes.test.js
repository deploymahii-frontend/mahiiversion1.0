import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import adminRoutes from "../src/modules/admin/admin.routes.js";

describe("Admin routes", () => {
  it("exposes the users endpoint for admin requests", async () => {
    const app = express();
    app.use("/admin", adminRoutes);

    const response = await request(app).get("/admin/users");

    expect(response.status).not.toBe(404);
  });

  it("exposes product, order, payment, and categories endpoints for admin requests", async () => {
    const app = express();
    app.use("/admin", adminRoutes);

    const productsResponse = await request(app).get("/admin/products");
    const ordersResponse = await request(app).get("/admin/orders");
    const paymentsResponse = await request(app).get("/admin/payments");
    const categoriesResponse = await request(app).get("/admin/categories");

    expect(productsResponse.status).not.toBe(404);
    expect(ordersResponse.status).not.toBe(404);
    expect(paymentsResponse.status).not.toBe(404);
    expect(categoriesResponse.status).not.toBe(404);
  });

  it("exposes payment status update endpoint for admin requests", async () => {
    const app = express();
    app.use(express.json());
    app.use("/admin", adminRoutes);

    const response = await request(app)
      .patch("/admin/payments/123/status")
      .send({ status: "SUCCESS" });

    expect(response.status).not.toBe(404);
  });
});
