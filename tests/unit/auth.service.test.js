import { describe, it, expect } from "vitest";

import {

    generateAccessToken

} from "../../src/services/token.service.js";

describe("Token Service", () => {

    it("creates access token", () => {

        const token = generateAccessToken({

            id: "123"

        });

        expect(token).toBeDefined();

        expect(typeof token).toBe("string");

    });

});
