import express, { NextFunction, Request, Response } from "express";
import SessionMiddleware from "../middlewares/session-middleware";
import CourseController from "../controllers/course-controller";

const courseRoutes = express.Router({
  strict: true,
  mergeParams: true,
});

courseRoutes.use(SessionMiddleware.verifySessionToken);

courseRoutes.get("/", (req: Request, res: Response, next: NextFunction) => {
  CourseController.readAll(req, res, next);
});

courseRoutes.get("/:shortname", (req: Request, res: Response, next: NextFunction) => {
    CourseController.readSchemaByShortname(req, res, next);
});

export default courseRoutes;
