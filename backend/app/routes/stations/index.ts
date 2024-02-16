import express from 'express';
const stationsRoutes = express.Router();

// NOTE: THESE ROUTES ARE USED BY THE ADMIN PANEL, THEY SHOULDNT BE USED FROM THE STATIONS THEMSELVES, FOR THAT THERE IS THE CLIENT ROUTES
import getList from "./getList";
stationsRoutes.use("/getList", getList);
import getStation from "./getStation";
stationsRoutes.use("/getStation", getStation);

export default stationsRoutes;