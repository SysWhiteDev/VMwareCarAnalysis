import express from "express";
const addClient = express.Router();
import wsServer from "../../services/ws";
import sql from "../../services/sql";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

addClient.post("/", async (req, res) => {
    const connectId = req.body.code;
    const decodedToken = jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    if (!decodedToken?.id) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    await sql`INSERT INTO stations (id, owner_id) values (${uuidv4()}, ${decodedToken.id})`
    wsServer.clients.forEach((client) => {
        // @ts-ignore
        if (client.id === connectId) {
            client.send("apikey:YAPYAP");
        }
    });
    res.status(200).json({ message: "Client added" });

});
export default addClient;