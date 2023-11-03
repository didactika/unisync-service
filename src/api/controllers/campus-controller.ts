import { Request, Response } from "express-serve-static-core";
import Campus from "../../structures/classes/models-classes/campus-class";
import httpClient from "http-response-client";
import ErrorMiddleware from "../middlewares/error-middleware";
import { NextFunction } from "express";
import CourseController from "./course-controller";

/**
 * @class CampusController
 */
export default class CampusController {

    /**
     * Create a new campus
     * @memberof CampusController
     */
    public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, url, token } = req.body;
        try {
            const newCampus = new Campus({ name, url, token });
            await newCampus.Create();
            CourseController.compareData(newCampus);
            res.status(201).json({
                uuid: newCampus.uuid,
                name: newCampus.name,
                url: newCampus.url
            });
        } catch (error) {
            next
        }
    }

    /**
     * Read all campus
     * @memberof CampusController
     */
    public static async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
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
            next(error);
        }
    }
}