import IUser from "../../interfaces/models-interfaces/user-interfaces";
import models from "../../../database/models/models";
import ICampus from "../../interfaces/models-interfaces/campus-interfaces";
import { CampusFilter, CampusFormatedResponse } from "../../types/models-classes-types/campus-class-types";

/**
 * @class Campus
 * @implements {ICampus}
 */
export default class Campus implements ICampus {
    public readonly id?: string;
    public readonly uuid?: string;
    private _name: string;
    private _url: string;
    private _token: string;
    public readonly createdAt?: Date;

    /**
     * Define the campus model
     * @constructor
     * @param {ICampus} campus campus model
     */
    constructor(campus: ICampus) {
        this.id = campus.id;
        this.uuid = campus.uuid;
        this._name = campus.name;
        this._url = campus.url;
        this._token = campus.token;
        this.createdAt = campus.createdAt;
    }

    /**
     * @Getters
     */
    public get name(): string {
        return this._name;
    }
    public get url(): string {
        return this._url;
    }
    public get token(): string {
        return this._token;
    }

    /**
     * @Setters
     */
    public set name(name: string) {
        this._name = name;
    }
    public set url(url: string) {
        this._url = url;
    }
    public set token(token: string) {
        this._token = token;
    }

    /**
     * @method Create
     * @description Create a new campus
     * @memberof Campus
     */
    public async Create(): Promise<void> {
        await models.user.create({
            name: this._name,
            url: this._url,
            token: this._token
        });
    }

    /**
   * @method GetFormatReadResponse
   * @description Format the response of the read methods
   * @param {ICampus} campus campus to be formatted
   * @returns {CampusFormatedResponse} Formatted Campus
   * @memberof Campus
   */
  private static GetFormatReadResponse(campus: ICampus): CampusFormatedResponse {
    return {
        id: campus.id,
        uuid: campus.uuid,
        name: campus.name,
        url: campus.url,
        token: campus.token,
        createdAt: campus.createdAt
    }
  }
    
    /**
   * @method ReadOneByFilter
   * @description Read one campus by filter
   * @param {CampusFilter} filter Filter to be used
   * @returns {CampusFormatedResponse | null} campus found
   * @memberof Campus
   */
  public static async ReadOneByFilter(
    filter: CampusFilter
  ): Promise<CampusFormatedResponse | null> {
    const campusFound = await models.user.findOne(filter) as ICampus;
    return campusFound
      ? this.GetFormatReadResponse(campusFound)
      : null;
  }

  /**
   * @method ReadByFilter
   * @description Read some campuses by filter
   * @param {CampusFilter} filter Filter to be used
   * @returns {CampusFormatedResponse} Campuses found
   * @memberof Campus
   */
  public static async ReadByFilter(filter: CampusFilter): Promise<CampusFormatedResponse[]> {
    const campusFound = await models.user.find(filter) as ICampus[];
    return campusFound.map(campus => this.GetFormatReadResponse(campus));
  }

  /**
   * @method ReadAll
   * @description Read all campuses
   * @returns {CampusFormatedResponse} Campuses found
   * @memberof Campus
   */
  public static async ReadAll(): Promise<CampusFormatedResponse[]> {
    const campusFound = await models.user.find() as ICampus[];
    return campusFound.map(campus => this.GetFormatReadResponse(campus));
  }
}