import { CategoryCreationAttributes } from "../../../db/types/models/category";

export interface ICategory extends CategoryCreationAttributes {
  id?: number;
}
