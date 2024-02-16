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
    for (const client of wsServer.clients) {
        // @ts-ignore
        if (client.id === connectId) {
            const id = uuidv4();
            await sql`INSERT INTO stations (id, owner_id, added_timestamp) values (${id}, ${decodedToken.id}, ${new Date().toISOString()})`;
            const token = jwt.sign({ id: id, owner_id: decodedToken.id }, process.env.JWT_SECRET as string);
            await sql`INSERT INTO stations_tokens (owner_id, station_id, token, status) values (${decodedToken.id},${id}, ${token}, 1)`;
            client.send(`apikey:${token}`);
            return res.status(200).json({ message: "Client added", client_id: id });
        }
    }
    return res.status(404).json({ message: "Client not found"});
});
export default addClient;