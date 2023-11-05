import express from "express";
import userRoutes from "./user-routes";
import campusRoutes from "./campus-routes";
import courseRoutes from "./course-routes";
import modRoutes from "./mod-routes";

const router = express.Router({
    strict: true,
})

router.use("/user", userRoutes);
router.use("/campus", campusRoutes);
router.use("/campus/:campusUuid/course", courseRoutes);
router.use("/campus/:campusUuid/course/:shortname/mod", modRoutes);

export default router;
