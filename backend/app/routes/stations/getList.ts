import express from "express";

const getList = express.Router();
import sql from "../../services/sql";
import jwt from "jsonwebtoken";
import wsServer from "../../services/ws";

getList.get("/", async (req, res) => {
    const decodedToken = jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    if (!decodedToken?.id) {
        return res.status(500).json({error: "Internal Server Error"})
    }
    let stations: any = await sql`SELECT * FROM stations WHERE owner_id = ${decodedToken.id}`;

    for (let station of stations) {

        wsServer.clients.forEach((client) => {
            // @ts-ignore
            if (client.id === station.id) {
                station.status = "online";
            }
        });
    }

    return res.status(200).json({data: stations})
})
export default getList;