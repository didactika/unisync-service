import BaseEventEmitter from "../../../../core/events/internal/base-event-emiter";
import { CourseEvents } from "../../../course/db/events";
import SectionCreated from "../../../course/events/section-created.event";

const observer = () => {
  BaseEventEmitter.onEvent(CourseEvents.SectionCreated, async (event: SectionCreated) => {
    try {
      const sectionData = event.data;
      if (!sectionData.id) return;
      await ModController.syncFromCampus(sectionData.id);
    } catch (err) {
      console.log(err);
    }
  });
}

export default { observer};
