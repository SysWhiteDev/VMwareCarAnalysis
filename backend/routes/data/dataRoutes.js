import { Router } from "express";
const dataRoutes = Router();

dataRoutes.get("/", (req, res) => {
    res.send("DATA AUTH PROTECTED ROUTE");
});


export default dataRoutes;