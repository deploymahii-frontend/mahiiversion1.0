import bcrypt from "bcryptjs";
import crypto from "crypto";

export function hashPassword(password) {
    return bcrypt.hash(password, 12);
}

export function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

export function generateResetToken() {
    return crypto.randomBytes(32).toString("hex");
}
