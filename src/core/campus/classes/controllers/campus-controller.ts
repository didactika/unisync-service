import { CampusCreationData } from "../../types/classes/controllers/campus-controller";
import CampusConnectorBase from "../campus-connector/campus-connector-base";
import CampusEntity from "../entities/campus";
import CampusJSON from "../../statics/campus-brands.json";
import environment from "../../../../config/environment";
import { ICampus } from "../../types/classes/entities/campus-interface";
import Campus from "../entities/campus";

export default class CampusController {
  public static async validateAndCreate(campusData: CampusCreationData): Promise<ICampus | undefined> {
    if (await this.campusExists(campusData.url)) return undefined;
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
      return await campus.create();
    }
    return undefined;
  }

  public static async campusExists(url: string): Promise<boolean> {
    return (await Campus.findOne<ICampus>({ url })) !== null;
  }

  public static async getAll(): Promise<ICampus[]> {
    return (await Campus.findMany<ICampus>({})).map((campus) => ({
      ...campus,
      id: undefined,
    }));
  }
}
