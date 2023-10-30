import { Response } from "express";
import httpClient from "http-response-client";
import DefaultError from "http-response-client/lib/errors/default-error";

/**
 * @class ErrorMiddleware
 */
export default class ErrorMiddleware {
    /**
     * @method responseError
     * @description middleware to response with an error
     * @param {Error} err
     * @param {Response} res
     * @memberof ErrorMiddleware
     */
    public static async responseError(err: Error, res: Response): Promise<void> {
        let error: DefaultError = httpClient.createError(500, { name:err.name, msg: err.message });
        if (httpClient.isHttpError(err))
            error = err as DefaultError;
        res.status(error.status).json(error.response);
    }
}