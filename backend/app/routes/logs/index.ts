import express from "express";
const logRoutes = express.Router();

import activity from "./activity";
logRoutes.use("/activity", activity);

export default logRoutes;