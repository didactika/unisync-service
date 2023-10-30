import { Request, Response } from "express-serve-static-core";
import Campus from "../../structures/classes/models-classes/campus-class";
import httpClient from "http-response-client";
import ErrorMiddleware from "../middlewares/error-middleware";

export default class CampusController {
    public static async create(req: Request, res: Response): Promise<void> {
        const { name, url, token } = req.body;
        try {
            if (!name || !url || !token || !name.trim() || !url.trim() || !token.trim())
                throw new httpClient.errors.BadRequest({ msg: "Invalid request body" });

            const newCampus = new Campus({ name, url, token });
            await newCampus.Create();
            res.status(201).json({
                uuid: newCampus.uuid,
                name: newCampus.name,
                url: newCampus.url
            });
        } catch (error) {
            ErrorMiddleware.responseError(error as Error, res);
        }
    }

    public static async readAll(req: Request, res: Response): Promise<void> {
        try {
            const campusFounds = await Campus.ReadAll();
            res.status(200).json(campusFounds.map(campus => {
                return {
                    uuid: campus.uuid,
                    name: campus.name,
                    url: campus.url
                }
            }));
        } catch (error) {
            ErrorMiddleware.responseError(error as Error, res);
        }
    }
}