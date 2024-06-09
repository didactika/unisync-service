import { Request } from "express";
import config from "../config";
import httpClient from "http-response-client";

/**
 * @class URLHandler
 * @description Handler for URL
 */
export default class URLHandler {

  /**
   * @method validate
   * @description Check if the url is valid
   * @param {string} url url to check
   * @returns {URL} The url if it is valid
   * @throws InvalidURLError if the url is invalid
   * @memberof URLHandler
   */
  public static validate(url: string): URL {
    try {
      return new URL(url);
    } catch {
      throw new httpClient.errors.BadRequest({ msg: "Invalid url" });
    }
  }

  /**
   * @method ObtainUrl
   * @description Obtain the url from the request
   * @param {Request} req Request to obtain the url
   * @returns {string} The url from the request
   * @memberof URLHandler
   */
  public static ObtainUrl(req: Request): string {
    return `${req.protocol}://${req.headers.host}${config.app.APP_NAME
      }${req.baseUrl}${req.url.split("?")[0]}`;
  }
}