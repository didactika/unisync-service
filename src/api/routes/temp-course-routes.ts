import express, { NextFunction, Request, Response} from "express";
import SessionMiddleware from "../middlewares/session-middleware";
import ModController from "../controllers/mod-controller";
import TempCourseController from "../controllers/temp-course-controller.ts";

const tempCourseRoutes = express.Router({
    strict: true,
    mergeParams: true
})

tempCourseRoutes.get("/",SessionMiddleware.verifySessionToken, (req: Request, res: Response, next: NextFunction) => {
    TempCourseController.readOne(req, res, next);
});
tempCourseRoutes.post("/",SessionMiddleware.verifySessionToken, (req: Request, res: Response, next: NextFunction) => {
    TempCourseController.save(req, res, next);
});
tempCourseRoutes.put("/",SessionMiddleware.verifySessionToken, (req: Request, res: Response, next: NextFunction) => {
    TempCourseController.update(req, res, next);
});
tempCourseRoutes.delete("/",SessionMiddleware.verifySessionToken, (req: Request, res: Response, next: NextFunction) => {
    TempCourseController.delete(req, res, next);
});
export default tempCourseRoutes;