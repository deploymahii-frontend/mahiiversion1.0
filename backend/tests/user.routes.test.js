import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import userRoutes from "../src/modules/users/user.routes.js";

describe("User routes", () => {
  it("exposes the /users/me GET endpoint", async () => {
    const app = express();
    app.use("/users", userRoutes);

    const response = await request(app).get("/users/me");

    expect(response.status).not.toBe(404);
  });

  it("exposes the /users/me PUT endpoint", async () => {
    const app = express();
    app.use(express.json());
    app.use("/users", userRoutes);

    const response = await request(app)
      .put("/users/me")
      .send({ firstName: "Test" });

    expect(response.status).not.toBe(404);
  });
});
