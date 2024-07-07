import { CampusEvents } from "../../../core/campus/db/events";
import CampusCreated from "../../../core/campus/events/campus-created-event";
import BaseEventEmitter from "../../events/base-event-emiter";
import CategoryController from "../controllers/category-controller";

const observer = () => {
  BaseEventEmitter.onEvent(CampusEvents.CampusCreated, async (event: CampusCreated) => {
    const campusData = event.data;
    if (!campusData.id) return;
    await CategoryController.syncCategoriesFromCampus(campusData.id);
  });
};

export default { observer };
