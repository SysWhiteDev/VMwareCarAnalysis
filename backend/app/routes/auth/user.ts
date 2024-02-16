import express from "express";

const user = express.Router();
import sql from "../../services/sql";
import jwt from "jsonwebtoken";

user.get("/", async (req, res) => {
    const token = req.headers.authorization as string;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    if (!decodedToken.id) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json((await sql`SELECT id, username FROM public.users WHERE id = ${decodedToken?.id}`)[0]);
})

export default user;