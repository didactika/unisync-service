import BaseEvent from "../../../core/events/internal/base-event";
import { SectionCreatedEventData } from "../types/events/internal/section-created";

export default class SectionCreated extends BaseEvent<SectionCreatedEventData> {
  constructor(section: SectionCreatedEventData) {
    super(section);
  }
}
