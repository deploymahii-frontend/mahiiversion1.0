import crypto from "crypto";

import * as sessionRepository from "../sessions/session.repository.js";

import {
    verifyRefreshToken,
    generateAccessToken,
    generateRefreshToken
} from "./jwt.service.js";

import User from "../users/user.model.js";

class SessionService {

    async createSession({
        user,
        refreshToken,
        req
    }) {

        const decoded = verifyRefreshToken(refreshToken);

        const expiresAt = new Date(decoded.exp * 1000);

        return sessionRepository.createSession({

            user: user._id,

            refreshToken,

            deviceId:
                req.headers["x-device-id"] ||
                crypto.randomUUID(),

            deviceName:
                req.headers["x-device-name"] || "Unknown Device",

            browser:
                req.headers["sec-ch-ua"] || "Unknown",

            os:
                req.headers["sec-ch-ua-platform"] || "Unknown",

            platform:
                req.headers["platform"] || "WEB",

            ipAddress:
                req.ip,

            userAgent:
                req.headers["user-agent"],

            expiresAt

        });

    }

    async refreshSession(refreshToken) {

        const payload =
            verifyRefreshToken(refreshToken);

        const session =
            await sessionRepository.findByRefreshToken(
                refreshToken
            );

        if (!session) {
            throw new Error("Invalid session.");
        }

        const user =
            await User.findById(payload.id)
                .populate("role");

        if (!user) {
            throw new Error("User not found.");
        }

        const accessToken =
            generateAccessToken(user);

        const newRefreshToken =
            generateRefreshToken(user);

        await sessionRepository.revokeSession(
            session._id
        );

        return {

            accessToken,

            refreshToken: newRefreshToken,

            user

        };

    }

    async logout(sessionId) {

        return sessionRepository.revokeSession(
            sessionId
        );

    }

    async logoutAll(userId) {

        return sessionRepository.revokeAllSessions(
            userId
        );

    }

    async getSessions(userId) {

        return sessionRepository.findActiveSessions(
            userId
        );

    }

    async cleanupExpiredSessions() {

        return sessionRepository.deleteExpiredSessions();

    }

}

export default new SessionService();
