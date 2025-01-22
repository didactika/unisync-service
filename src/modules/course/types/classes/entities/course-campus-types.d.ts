import { CampusFilter } from "../../../../../core/campus/types/classes/entities/campus-filter";
import { ICampus } from "../../../../../core/campus/types/classes/entities/campus-interface";
import { CategoryFilter } from "../../../../../core/types/classes/entities/category-filter";
import { ICategory } from "../../../../../core/types/classes/entities/category-interface";
import { CourseCampusCreationAttributes } from "../../db/models/course-campus";
import { CourseFilter, ICourse } from "./course-types";

export interface ICourseCampus extends CourseCampusCreationAttributes {
  id?: number;
}

export type CourseCampusFilter = {
  campus?: CampusFilter;
  course?: CourseFilter;
  category?: CategoryFilter;
  base?: {
    id?: number;
    idOnCampus?: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
};

export type CourseCampusFindResponse = {
  id: number;
  idOnCampus: number;
  campusId: number;
  courseId: number;
  categoryId: number;
  campus: ICampus;
  course: ICourse;
  category: ICategory;
  createdAt: Date;
  updatedAt: Date;
}

