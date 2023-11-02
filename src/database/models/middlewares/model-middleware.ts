import { MongoServerError } from "mongodb";
import { Document, Schema } from "mongoose";
import httpClient from "http-response-client";
import uuid from "uuid";

/**
 * @class ModelMiddleware
 */
export default abstract class ModelMiddleware {


  /**
   * Apply all middlewares
   * @param {Schema} schema
   * @memberof ModelMiddleware
   */
  public static applyAll(schema: Schema): void {
    ModelMiddleware.checkDuplicatedData(schema);
    ModelMiddleware.checkRequiredFields(schema);
    ModelMiddleware.checkInvalidId(schema);
    ModelMiddleware.validateUUID(schema);
  };

  /**
 * Check if have data is duplicate
 * @param {Schema} schema
 * @memberof ModelMiddleware
 */
  public static checkDuplicatedData(schema: Schema): void {
    schema.post('save', function (error: Error, doc: Document, next: (error?: Error) => void) {
      const err = error as MongoServerError;
      if (err && err.name === 'MongoServerError' && err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        next(new httpClient.errors.Conflict({ msg: `The ${field} is already in use` }));
      }
      next(err);
    });
  }

  /**
   * Check if the required fields are missing
   * @param {Schema} schema
   * @memberof ModelMiddleware
   */
  public static checkRequiredFields(schema: Schema) {
    schema.post('save', function (error: Error, doc: Document, next: (error?: Error) => void) {
      const err = error as MongoServerError;
      if (err && err.name === 'ValidationError') {
        const fields = Object.keys(err.errors);
        const msg = fields.map(field => err.errors[field].message).join(', ');
        next(new httpClient.errors.BadRequest({ msg }));
      }
      next(err);
    });
  }
  /**
   * Check if the id is invalid
   * @param {Schema} schema
   * @memberof ModelMiddleware
   */
  public static checkInvalidId(schema: Schema) {
    schema.post('findOne', function (error: Error, doc: Document, next: (error?: Error) => void) {
      const err = error as MongoServerError;
      if (err && err.name === 'CastError') {
        next(new httpClient.errors.BadRequest({ msg: `Invalid id: ${err.value}` }));
      }
      next(err);
    });
  }

  /**
   * Validate the uuid
   * @param {Schema<any & {uuid:string}>} schema
   * @memberof ModelMiddleware
   */
  public static validateUUID(schema: Schema) {
    schema.pre('save', function (next) {
      if (!uuid.validate(this.uuid) || uuid.version(this.uuid) !== 4)
        next(new httpClient.errors.BadRequest({ msg: `Invalid uuid: ${this.uuid}` }));
      next();
    });
  }
}