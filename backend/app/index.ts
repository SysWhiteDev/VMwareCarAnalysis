// src/index.js
import 'dotenv/config';
import express from 'express';
import cors from "cors";
import {log} from './utils/utils';
import authMiddleware from "./middleware/checkAuth";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(`EVver2 running`);
});

// AUTH ROUTES
import authRoutes from "./routes/auth";
app.use("/auth", authRoutes);

import logRoutes from "./routes/logs";
app.use("/logs", authMiddleware, logRoutes);

app.listen(process.env.PORT, () => {
    log(`Server is running at http://localhost:${process.env.PORT || 8069}`, "info");
    if (process.env.NODE_ENV === "production") {
        log("Production mode", "info");
    } else {
        log("Development mode", "warn");
    }
});