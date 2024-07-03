import { BaseAttributes } from "../../../../../core/db/types/base-attributes";

export type ModuleAttributes = BaseAttributes & {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ModuleCreationAttributes = Omit<ModuleAttributes, "id">;
