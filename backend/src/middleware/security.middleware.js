// src/middleware/security.middleware.js

import helmet from "helmet";

export default function security(app) {
    app.use(
        helmet({
            crossOriginResourcePolicy: {
                policy: "cross-origin",
            },
        })
    );
}
