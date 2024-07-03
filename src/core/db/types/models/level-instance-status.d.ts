import { EMigrationStatus } from "../../../enums/migration-status-enum";
import { BaseAttributes } from "../base-attributes";

export type LevelInstanceStatusAttributes = BaseAttributes &  {
  idInstance: number;
  idLevel: number;
  status: EMigrationStatus;
};

export type LevelInstanceStatusCreationAttributes = Omit<LevelInstanceStatusAttributes, "id">;
