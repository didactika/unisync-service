import BaseEvent from "../../events/classes/base-event";
import { CampusCreatedEventData } from "../types/events/campus-created";

export default class CampusCreated extends BaseEvent<CampusCreatedEventData> {
  constructor(campus: CampusCreatedEventData) {
    super(campus);
  }
}
