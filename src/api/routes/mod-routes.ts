import express, { NextFunction, Request, Response} from "express";
import SessionMiddleware from "../middlewares/session-middleware";
import ModController from "../controllers/mod-controller";

const modRoutes = express.Router({
    strict: true,
    mergeParams: true
})

modRoutes.get("/:modType",SessionMiddleware.verifySessionToken, (req: Request, res: Response, next: NextFunction) => {
    ModController.readModsByType(req, res, next);
});
export default modRoutes;