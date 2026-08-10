import crypto from "crypto";

import {
    verifyRefreshToken,
    generateAccessToken,
    generateRefreshToken
} from "./jwt.service.js";

import User from "../auth/models/user.model.js";

class SessionService {

    async createSession({
        user,
        refreshToken,
        req
    }) {
        return {
            user: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };
    }

    async refreshSession(refreshToken) {
        const payload = verifyRefreshToken(refreshToken);
        const userId = payload.id || payload._id || payload.userId;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found.");
        }

        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        return {
            accessToken,
            refreshToken: newRefreshToken,
            user
        };
    }

    async logout(sessionId) {
        return true;
    }

    async logoutAll(userId) {
        return true;
    }

    async getSessions(userId) {
        return [];
    }

    async cleanupExpiredSessions() {
        return true;
    }

}

export default new SessionService();
