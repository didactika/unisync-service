import { BaseAttributes } from "../../../../../core/db/types/base-attributes";

export type ModuleAttributes = BaseAttributes & {
  name: string;
};

export type ModuleCreationAttributes = Omit<ModuleAttributes, "id">;
