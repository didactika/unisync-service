import express from "express";
import userRoutes from "./user-routes";
import campusRoutes from "./campus-routes";

const router = express.Router({
    strict: true,
})

router.use("/user", userRoutes);
router.use("/campus", campusRoutes);
router.use("/course", campusRoutes);

export default router;
