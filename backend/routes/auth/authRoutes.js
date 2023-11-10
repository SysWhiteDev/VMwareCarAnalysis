import { Router } from "express";
const authRoutes = Router();

import login from "./login.js";
import register from "./register.js";

authRoutes.use("/login", login);
authRoutes.use("/register", register);

export default authRoutes;
