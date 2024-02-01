import express from "express";
const status = express.Router();

status.get("/", (req, res) => {
    res.status(200).json({ success: "Authorized" });
});
export default status;