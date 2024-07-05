import { observer as CampusObserverCore } from "../core/classes/observers/campus-created-observer";
import { observer as CampusObserverCourse } from "../modules/course/classes/observers/campus-created-observer";
import { observer as CourseObserver } from "../modules/course/classes/observers/course-created-observer";

export default function initializeObservers() {
  CampusObserverCore();
  CampusObserverCourse();
  CourseObserver();
}
