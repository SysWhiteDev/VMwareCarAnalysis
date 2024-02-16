import express from "express";
import authMiddleware from "../../middleware/checkAuth";
const authRoutes = express.Router();

import register from "./register";
authRoutes.use("/register", register);
import login from "./login";
authRoutes.use("/login", login);
import logout from "./logout";
authRoutes.use("/logout",authMiddleware, logout);
import status from "./status";
authRoutes.use("/status",authMiddleware, status);
import user from "./user";
authRoutes.use("/user",authMiddleware, user);
export default authRoutes;