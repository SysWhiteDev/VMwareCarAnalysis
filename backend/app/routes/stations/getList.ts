import express from "express";

const getList = express.Router();
import sql from "../../services/sql";
import jwt from "jsonwebtoken";

getList.get("/", async (req, res) => {
    const decodedToken = jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    if (!decodedToken?.id) {
        return res.status(500).json({error: "Internal Server Error"})
    }
    const stations = await sql`SELECT * FROM stations WHERE owner_id = ${decodedToken.id}`;
    return res.status(200).json({data: stations})
})
export default getList;