import express from 'express';
import authMiddleware from "../../middleware/checkAuth";
const clientRoutes = express.Router();

import addClient from "./addClient";
clientRoutes.use("/add", addClient);

export default clientRoutes;