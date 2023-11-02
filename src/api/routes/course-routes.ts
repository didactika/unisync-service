import express, { NextFunction, Request, Response} from "express";
import SessionMiddleware from "../middlewares/session-middleware";
import CourseController from "../controllers/course-controller";

const courseRoutes = express.Router({
    strict: true,
})


courseRoutes.get("/", (req: Request, res: Response, next: NextFunction) => {
    SessionMiddleware.verifySessionToken(req, res, () => {
            CourseController.readAll(req, res, next);
    });
});

export default courseRoutes;