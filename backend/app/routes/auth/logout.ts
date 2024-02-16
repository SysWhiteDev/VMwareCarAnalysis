import express from "express";
const logout = express.Router();
import sql from "../../services/sql";
import {registerActivity} from "../../utils/utils";
import jwt from "jsonwebtoken";

logout.post("/", async (req, res) => {
    const decodedToken = jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    if (!decodedToken.id) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
    await sql`UPDATE public.tokens SET status = 0 WHERE token = ${req.headers.authorization as string}`;
    await registerActivity(decodedToken?.id, "User logged out", 0)
    return res.status(200).json({ message: "Logged out" });
});
export default logout;