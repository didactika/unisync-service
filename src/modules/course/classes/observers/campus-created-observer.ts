import { Events as CampusEvents } from "../../../../core/campus/db/events";
import CampusCreated from "../../../../core/campus/events/campus-created-event";
import BaseEventEmitter from "../../../../core/events/classes/base-event-emiter";
import CourseController from "../controllers/course-controller";

const observer = () => {
  BaseEventEmitter.onEvent(CampusEvents.CampusCreated, async (event: CampusCreated) => {
    try {
      const campusData = event.data;
      if (!campusData.id) return;
      await CourseController.syncFromCampus(campusData.id);
    } catch (err) {
      console.log(err);
    }
  });
}

export default { observer};
