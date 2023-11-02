import { Types } from "mongoose";
import ICampus from "../../interfaces/models-interfaces/campus-interfaces";

/**
 * @interface IMCampus
 * @description Mongoose Cammpus Interface
 */
export interface IMCampus extends Omit<ICampus, "id"> {
    _id: Types.ObjectId
}