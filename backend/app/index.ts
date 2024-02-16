// src/index.js
import 'dotenv/config';
import express from 'express';
import cors from "cors";
import {log} from './utils/utils';
import authMiddleware from "./middleware/checkAuth";
import wsServer from "./services/ws";


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
import stationsRoutes from "./routes/stations";
app.use("/stations", authMiddleware, stationsRoutes);
import clientRoutes from "./routes/client";
app.use("/client", clientRoutes);

import WebSocket from "ws";
import sql from "./services/sql";
app.listen(process.env.PORT, () => {
    log(`REST API server is running at http://localhost:${process.env.PORT || 8069}`, "info");
    if (process.env.NODE_ENV === "production") {
        log("Production mode", "info");
    } else {
        log("Development mode", "warn");
    }
});

let clientIDS: string[] = []; // transform this into redis store
wsServer.on("connection", (socket: WebSocket) => {
    // generate a random numeric only id and check if it already exists
    let id: string = (Math.floor(Math.random() * 900000) + 100000).toString();
    while (clientIDS.includes(id)) {
        id = (Math.floor(Math.random() * 900000) + 100000).toString();
    }
    socket.on("message", (message) => {
        if (message.toString() === "getCode") {
            // @ts-ignore
            socket.id = id;
            socket.send(`code:${id}`);
        }
        if (message.toString().split(":")[0] === "auth") {
            sql`SELECT * FROM stations_tokens WHERE token = ${message.toString().split(":")[1]}`.then((res) => {
                if (res.length === 0) {
                    socket.send("auth:failed");
                } else {
                    // @ts-ignore
                    socket.id = res[0].station_id;
                    clientIDS.push(res[0].station_id);
                    socket.send("auth:success");
                }
            })
        }
    });
});