import { Request, Response } from "express-serve-static-core";
import Campus from "../../structures/classes/models-classes/campus-class";
import { log } from "console";

export default class CampusController {
    public static async create(req: Request, res: Response): Promise<void> {
        const { name, url, token } = req.body;
        try {
            if (!name || !url || !token || !name.trim() || !url.trim() || !token.trim())
                throw new Error("Invalid request body");

            const newCampus = new Campus({ name, url, token });
            await newCampus.Create();
            res.status(201).json(newCampus);
        } catch (error) {
            if (error instanceof Error) {
                log(error);
                res.status(400).json(error.message);
            }
        }
    }
}