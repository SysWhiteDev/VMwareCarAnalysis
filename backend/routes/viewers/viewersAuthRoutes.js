import { Router } from "express";
const viewersAuthRoutes = Router();
import authMiddleware from "../../middlewares/authMiddleware.js";

import status from "./status.js";
viewersAuthRoutes.use("/status", status);

import claim from "./claim.js";
viewersAuthRoutes.use("/claim", authMiddleware, claim);

import getList from "./getList.js";
viewersAuthRoutes.use("/getList", authMiddleware, getList);

import deleteViewer from "./delete.js";
viewersAuthRoutes.use("/delete", authMiddleware, deleteViewer);

export default viewersAuthRoutes;
