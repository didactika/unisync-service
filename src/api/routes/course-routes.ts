import express, { NextFunction, Request, Response} from "express";
import SessionMiddleware from "../middlewares/session-middleware";
import CourseController from "../controllers/course-controller";

const courseRoutes = express.Router({
    strict: true,
    mergeParams: true
})

courseRoutes.get("/", (req: Request, res: Response, next: NextFunction) => {
    SessionMiddleware.verifySessionToken(req, res, () => {
            CourseController.readAll(req, res, next);
    });
});

courseRoutes.get("/:courseUuid", (req: Request, res: Response, next: NextFunction) => {
    SessionMiddleware.verifySessionToken(req, res, () => {
            CourseController.readOne(req, res, next);
    });
});

export default courseRoutes;