import { moodleClient } from "moodle-web-service-client";
import { ICampusConnectorBase } from "../../types/classes/campus-connector/campus-connector-base";
import CampusConnectorBase from "./campus-connector-base";
import { GetCategoryResponse } from "../../types/classes/campus-connector/campus-connector-category";

export default class CampusConnectorCategory extends CampusConnectorBase {
  constructor(campusConnector: ICampusConnectorBase) {
    super(campusConnector);
  }

  public async getCategories(): Promise<GetCategoryResponse[]> {
    const data = (
      await moodleClient({
        urlRequest: {
          rootURL: this.url,
          token: this.token,
          webServiceFunction: "core_course_get_categories",
        },
        content: {},
      })
    ).data as GetCategoryResponse[];
    return data;
  }
}
