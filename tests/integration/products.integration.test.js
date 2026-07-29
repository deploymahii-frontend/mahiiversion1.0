import request from "supertest";

import app from "../../src/app.js";

describe("Products API", () => {

    it("returns products list", async () => {

        const response = await request(app)

            .get("/api/v1/products");

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

    });

});
