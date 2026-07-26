import jwt from "jsonwebtoken";
import User from "../modules/users/user.model.js";
import UnauthorizedError from "../shared/errors/UnauthorizedError.js";

export async function authenticate(req, res, next) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedError("Authorization header missing.");
        }

        if (!authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError("Invalid authorization format.");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id)
            .populate("role");

        if (!user) {
            throw new UnauthorizedError("User not found.");
        }

        if (user.status !== "ACTIVE") {
            throw new UnauthorizedError("Account is inactive.");
        }

        req.user = user;

        next();

    } catch (error) {

        if (
            error.name === "TokenExpiredError"
        ) {
            return next(
                new UnauthorizedError("Token expired.")
            );
        }

        if (
            error.name === "JsonWebTokenError"
        ) {
            return next(
                new UnauthorizedError("Invalid token.")
            );
        }

        next(error);
    }
}
