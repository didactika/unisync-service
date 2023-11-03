import express, { NextFunction, Request, Response} from "express";
import CampusController from "../controllers/campus-controller";
import SessionMiddleware from "../middlewares/session-middleware";

const campusRoutes = express.Router({
    strict: true,
    mergeParams: true
})

campusRoutes.post("/", (req: Request, res: Response, next: NextFunction) => {
    SessionMiddleware.verifySessionToken(req, res, () => {
        CampusController.create(req, res, next);
    });
});

campusRoutes.get("/", (req: Request, res: Response, next: NextFunction) => {
    SessionMiddleware.verifySessionToken(req, res, () => {
            CampusController.readAll(req, res, next);
    });
});

export default campusRoutes;