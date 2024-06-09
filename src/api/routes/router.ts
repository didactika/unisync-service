import express from "express";
import config from "../../config";

const router = express.Router({
    strict: true,
})

router.get("/", (req, res) => {
    res.send(`Welcome to ${config.app.APP_NAME} API!!!`);
})

export default router;
