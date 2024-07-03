export type CategoryAttributes = {
  id: number;
  name: string;
  idnumber: string;
  idOnCampus: number;
  campusId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoryCreationAttributes = Omit<CategoryAttributes, "id">;