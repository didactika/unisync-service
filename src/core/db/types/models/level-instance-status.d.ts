export type LevelInstanceStatusAttributes = {
  id: number;
  idInstance: number;
  idLevel: number;
  status: "pending" | "inprogress" | "migrated" | "errors";
};

export type LevelInstanceStatusCreationAttributes = Omit<LevelInstanceStatusAttributes, "id">;
