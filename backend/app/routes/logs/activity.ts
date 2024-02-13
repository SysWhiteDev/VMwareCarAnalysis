import express from "express";
import sql from "../../services/sql";
import jwt from "jsonwebtoken";

const activity = express.Router();

activity.get("/", async (req, res) => {
    const decodedToken = jwt.decode(req.headers.authorization as any) as jwt.JwtPayload;
    if (!decodedToken?.id) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
    const activityQuery = await sql`SELECT type, timestamp, severity FROM public.activities WHERE author_id = ${decodedToken?.id}`
    res.status(200).json({status: "success", data: activityQuery});
});

export default activity;