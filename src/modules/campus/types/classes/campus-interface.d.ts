import { CampusCreationAttributes } from "../db/campus";

/**
 * @interface ICampus
 * @description Interface for Campus attributes
 * @export
 */
export interface ICampus extends CampusCreationAttributes {
  id?: number;
  uuid?: string;
  version?: string;
}
