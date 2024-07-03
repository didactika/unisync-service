import { BaseAttributes } from "../base-attributes";

export type LevelInstanceStatusAttributes = BaseAttributes &  {
  idInstance: number;
  idLevel: number;
  status: "pending" | "inprogress" | "migrated" | "errors";
};

export type LevelInstanceStatusCreationAttributes = Omit<LevelInstanceStatusAttributes, "id">;
