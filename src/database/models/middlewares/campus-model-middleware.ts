import {IMCampus} from "../../../structures/types/database-schemas-types/campus-schema-types";
import URLHandler from "../../../utils/url-handler";
import ModelMiddleware from "./model-middleware";

/**
 * @class CampusModelMiddleware
 */
export default class CampusModelMiddleware extends ModelMiddleware {
    /**
       * Validate the url
       * @param {IMCampus} this 
       * @param {() => void} next 
       * @memberof CampusModelMiddleware
       */
    public static validateUrl(this: IMCampus, next: () => void): void {
        URLHandler.validate(this.url);
        next();
    }
}