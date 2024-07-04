import { moodleClient } from "moodle-web-service-client";
import { ICampusConnectorBase } from "../../types/classes/campus-connector/campus-connector-base";
import CampusConnectorBase from "./campus-connector-base";
import { NCampusConnectorCourse } from "../../types/classes/campus-connector/campus-connector-course";

export default class CampusConnectorCourse extends CampusConnectorBase {
  constructor(campusConnector: ICampusConnectorBase) {
    super(campusConnector);
  }

  public async getCourseInformation(
    request: NCampusConnectorCourse.GetCourseInformationRequest
  ): Promise<NCampusConnectorCourse.GetCourseInformationResponse> {
    const data = (
      await moodleClient({
        urlRequest: {
          rootURL: this.url,
          token: this.token,
          webServiceFunction: "local_data_transfer_get_course",
        },
        content: request,
      })
    ).data as NCampusConnectorCourse.GetCourseInformationResponse;
    return data;
  }

  public async getCourses(): Promise<NCampusConnectorCourse.GetCourseResponse[]> {
    const data = (
      await moodleClient({
        urlRequest: {
          rootURL: this.url,
          token: this.token,
          webServiceFunction: "core_course_get_courses",
        },
        content: {},
      })
    ).data as NCampusConnectorCourse.GetCourseResponse[];
    return data;
  }
}
