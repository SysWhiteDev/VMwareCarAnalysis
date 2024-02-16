import express from "express";

const getStation = express.Router();

import sql from "../../services/sql";
import jwt from "jsonwebtoken";
import wsServer from "../../services/ws";

getStation.get("/:stationId", async (req, res) => {
    if (!req.params.stationId) {
        res.status(404).json({message: "Missing information"});
        return;
    }
    const decodedToken = jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    if (!decodedToken?.id) {
        res.status(500).json({message: "Internal Server Error"});
        return;
    }
    const data = await sql`SELECT name,type,location,last_charge,owner_id,added_timestamp FROM stations WHERE owner_id = ${decodedToken.id} AND id = ${req.params.stationId}`
    if (data.length === 0) {
        return res.status(404).json({message: "Station not found"});
    }
    data[0].status = "offline";
    wsServer.clients.forEach((client) => {
        // @ts-ignore
        if (client.id === req.params.stationId) {
            data[0].status = "online";
        }
    });
    return res.status(200).json({data: data[0]});
});

export default getStation;