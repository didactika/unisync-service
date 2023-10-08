import express from "express";
import userRoutes from "./user-routes";

const router = express.Router({
    strict: true,
})

router.use("/user", userRoutes);

export default router;
