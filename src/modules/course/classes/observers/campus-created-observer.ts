import { Events as CampusEvents } from "../../../../core/campus/db/events";
import CampusCreated from "../../../../core/campus/events/campus-created-event";
import BaseEventEmitter from "../../../../core/events/classes/base-event-emiter";
import CourseController from "../controllers/course-controller";

export function observer() {
  BaseEventEmitter.onEvent(CampusEvents.CampusCreated, async (event: CampusCreated) => {
    const campusData = event.data;
    if (!campusData.id) return;
    await CourseController.syncCoursesFromCampus(campusData.id);
  });
}
