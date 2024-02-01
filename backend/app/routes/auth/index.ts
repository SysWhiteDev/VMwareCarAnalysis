import express from "express";
const authRoutes = express.Router();

import register from "./register";
authRoutes.use("/register", register);
import login from "./login";
authRoutes.use("/login", login);
import status from "./status";
import authMiddleware from "../../middleware/checkAuth";
authRoutes.use("/status",authMiddleware, status);
export default authRoutes;