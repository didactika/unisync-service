import CourseCampus from "../entities/course-campus";
import { CourseCampusFindResponse, ICourseCampus } from "../../types/classes/entities/course-campus-types";
import { ECourseType } from "../../enums/course-type-enum";
import { GetCoursesByCampusResponse } from "../../types/classes/controllers/course-campus-controller-types";

export default class CourseCampusController {
  public static async findByCourseTypeAndShortname(data: {
    campusId: number;
    course: { shortname: string; type: ECourseType };
  }): Promise<CourseCampusFindResponse | null> {
    return (await CourseCampus.findOne(data)) as CourseCampusFindResponse;
  }

  public static async create(data: {
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

  public static async update(
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

  public static async getCoursesByCampus(
    campusId?: number
  ): Promise<GetCoursesByCampusResponse[] | GetCoursesByCampusResponse> {
    const response: GetCoursesByCampusResponse[] = [];

    ((await CourseCampus.findMany(campusId ? { campus: { id: campusId } } : {})) as CourseCampusFindResponse[]).forEach(
      (courseCampus) => {
        const responseIndexFound = response.findIndex((campus) => campus.campus.id === courseCampus.campus.id);
        if (
          responseIndexFound !== -1 &&
          response[responseIndexFound].courses.find((course) => course.id === courseCampus.course.id)
        )
          return;
        responseIndexFound !== -1
          ? response[responseIndexFound].courses.push(courseCampus.course)
          : response.push({ campus: courseCampus.campus, courses: [courseCampus.course] });
      }
    );
    return response.length === 1 ? response[0] : response;
  }
}
