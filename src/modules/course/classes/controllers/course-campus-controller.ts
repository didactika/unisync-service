import CourseCampus from "../entities/course-campus";
import { ICourseCampus } from "../../types/classes/entities/course-campus-types";
import { ECourseType } from "../../enums/course-type-enum";

export default class CourseCampusController {
  public static async findCourseCampus({
    campusId,
    shortname,
    type,
  }: {
    campusId: number;
    shortname: string;
    type: ECourseType;
  }): Promise<ICourseCampus | null> {
    return (await CourseCampus.findOne({
      campus: {
        id: campusId,
      },
      course: { shortname, type },
    })) as ICourseCampus;
  }

  public static async createCourseCampus(data: {
    campusId: number;
    categoryId: number;
    idOnCampus: number;
    courseId: number;
  }): Promise<ICourseCampus> {
    const courseCampusToCreate = new CourseCampus({
      campusId: data.campusId,
      categoryId: data.categoryId,
      idOnCampus: data.idOnCampus,
      courseId: data.courseId,
    });

    return await courseCampusToCreate.create();
  }

  public static async updateCourseCampus(
    courseCampusFound: ICourseCampus,
    data: {
      idOnCampus: number;
      categoryId: number;
    }
  ): Promise<ICourseCampus> {
    const courseCampusOnDB = new CourseCampus(courseCampusFound);
    courseCampusOnDB.categoryId = data.categoryId;
    courseCampusOnDB.idOnCampus = data.idOnCampus;

    return await courseCampusOnDB.update();
  }
}
