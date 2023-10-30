import express, { Request, Response} from "express";
import CampusController from "../controllers/campus-controller";
import SessionMiddleware from "../middlewares/session-middleware";

const campusRoutes = express.Router({
    strict: true,
})

campusRoutes.post("/", (req: Request, res: Response) => {
    SessionMiddleware.verifySessionToken(req, res, () => {
        CampusController.create(req, res);
    });
});

campusRoutes.get("/", (req: Request, res: Response) => {
    SessionMiddleware.verifySessionToken(req, res, (error) => {
            CampusController.readAll(req, res, error);
    });
});

export default campusRoutes;