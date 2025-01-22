import { InstalledComponentAttributes } from "../../db/models/installed-component";

/**
 * @interface IInstalledComponent
 * @description Interface for InstalledComponent attributes
 * @export
 */
export interface IInstalledComponent extends InstalledComponentAttributes {
  id?: number;
}
