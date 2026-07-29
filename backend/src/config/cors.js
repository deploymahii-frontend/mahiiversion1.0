// src/config/cors.js

import cors from "cors";

export default cors({
    origin: [
        "https://mahii.in",
        "https://www.mahii.in",
    ],
    credentials: true,
});
