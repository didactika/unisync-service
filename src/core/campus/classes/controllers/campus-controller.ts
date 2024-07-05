import { CampusCreationData } from "../../types/classes/controllers/campus-controller";
import CampusConnectorBase from "../campus-connector/campus-connector-base";
import CampusEntity from "../entities/campus";
import CampusJSON from "../../statics/campus-brands.json";
import environment from "../../../../config/environment";

export class CampusController {
  public static async validateAndCreateCampus(campusData: CampusCreationData): Promise<boolean> {
    const campusBaseActions = new CampusConnectorBase(campusData);
    const siteInfo = await campusBaseActions.getSiteInfo();
    if (siteInfo && siteInfo.sitename && (siteInfo.release || siteInfo.version)) {
      const campus = new CampusEntity({
        uuid:
          CampusJSON.find(
            (campus) => campusData.url.includes(campus.domain) && environment.app.APP_ENV === campus.environment
          )?.uuid ?? undefined,
        name: siteInfo.sitename,
        url: campusData.url,
        token: campusData.token,
        version: siteInfo.release ?? siteInfo.version,
      });
      await campus.create();
      return true;
    }
    return false;
  }
}
