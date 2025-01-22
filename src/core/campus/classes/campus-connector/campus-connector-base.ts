import { moodleClient } from "moodle-web-service-client";
import { GetSiteInfoResponse, ICampusConnectorBase } from "../../types/classes/campus-connector/campus-connector-base";

export default class CampusConnectorBase implements ICampusConnectorBase {
  public readonly url: string;
  public readonly token: string;

  constructor(campusConnector: ICampusConnectorBase) {
    this.url = campusConnector.url;
    this.token = campusConnector.token;
  }

  public async getSiteInfo(): Promise<GetSiteInfoResponse> {
    const data = (
      await moodleClient({
        urlRequest: {
          rootURL: this.url,
          token: this.token,
          webServiceFunction: "core_webservice_get_site_info",
        },
        content: {},
      })
    ).data as GetSiteInfoResponse;
    return data;
  }
}
