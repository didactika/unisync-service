import { MongoServerError } from "mongodb";
import { Document } from "mongoose";
import httpClient from "http-response-client";

/**
 * @class ModelMiddleware
 */
export default abstract class ModelMiddleware {
  /**
 * Check if have data is duplicate
 * @param {Error} error
 * @param {(error?: Error) => void} next
 * @memberof VerifyDataModelMiddleware
 */
  public static isDuplicatedData(error: Error, doc: Document, next: (error?: Error) => void) {
    const err = error as MongoServerError;
    if (err && err.name === 'MongoServerError' && err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      next(new httpClient.errors.Conflict({ msg: `The ${field} is already in use` }));
    }
    next(err);
  }
}