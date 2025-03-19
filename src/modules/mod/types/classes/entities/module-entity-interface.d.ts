import { ModuleCreationAttributes } from "../../db/models/module";

export default interface IModule extends ModuleCreationAttributes{
  id?: number;
}