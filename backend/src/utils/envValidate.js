// src/utils/envValidate.js

const required = [
    "JWT_SECRET",
    "MONGODB_URI",
    "CLIENT_URL",
];

export function validateEnv() {
    required.forEach(key => {
        if (!process.env[key]) {
            throw new Error(
                `${key} missing`
            );
        }
    });
}
