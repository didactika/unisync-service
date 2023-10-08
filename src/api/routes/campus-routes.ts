import express, { Request, Response } from "express";
import CampusController from "../controllers/campus-controller";

const campusRoutes = express.Router({
    strict: true,
})

campusRoutes.post("/", (req: Request, res: Response) => {
    CampusController.create(req, res);
});

export default campusRoutes;