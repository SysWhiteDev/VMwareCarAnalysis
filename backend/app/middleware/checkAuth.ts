import express from "express";
import sql from "../services/sql";
const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const jwt = await sql`SELECT * FROM public.tokens WHERE token = ${token}`;
    if (jwt.length === 0 || jwt[0].status === 0) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}
export default authMiddleware;