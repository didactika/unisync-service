import express, { Request, Response} from "express";
import SessionMiddleware from "../middlewares/session-middleware";
import CourseController from "../controllers/course-controller";

const courseRoutes = express.Router({
    strict: true,
})


courseRoutes.get("/", (req: Request, res: Response) => {
    SessionMiddleware.verifySessionToken(req, res, () => {
            CourseController.readAll(req, res);
    });
});

export default courseRoutes;