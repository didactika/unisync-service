import { Events as CampusEvents } from "../../../../core/campus/db/events";
import CampusCreated from "../../../../core/campus/events/campus-created-event";
import BaseEventEmitter from "../../../../core/events/classes/base-event-emiter";
import CourseController from "../controllers/course-controller";

export function observer() {
  BaseEventEmitter.onEvent(CampusEvents.CampusCreated, async (data: CampusCreated) => {
    const campusData = data.data;
    await CourseController.importCampusCourses(campusData);
  });
}
