import { Schema } from "mongoose";
import { IMCampus } from "../../../structures/types/database-schemas-types/campus-schema-types";
import URLHandler from "../../../utils/url-handler";
import ModelMiddleware from "./model-middleware";

/**
 * @class CampusModelMiddleware
 */
export default class CampusModelMiddleware extends ModelMiddleware {

    /**
     * Apply all middlewares
     * @param {Schema} schema
     * @memberof CampusModelMiddleware
     */
    public static applyAll(schema: Schema<IMCampus>): void {
        CampusModelMiddleware.validateUrl(schema);
        CampusModelMiddleware.checkDuplicatedData(schema);
        CampusModelMiddleware.checkRequiredFields(schema);
        CampusModelMiddleware.checkInvalidFields(schema);
        CampusModelMiddleware.checkInvalidId(schema);
        CampusModelMiddleware.validateUUID(schema);
    }
    /**
       * Validate the url
       * @param {Schema<IMCampus>} schema
       */
    public static validateUrl(schema: Schema<IMCampus>): void {
        schema.pre<IMCampus>('save', function (next) {
            URLHandler.validate(this.url);
            next();
        });
    }
}