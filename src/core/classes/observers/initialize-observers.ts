import ComponentLoader from "../../component/classes/component-loader";
import { ELoadPath } from "../../component/enums/load-path-enum";


export default async function initializeObservers() {
  await ComponentLoader.loadComponents({
    directory: "classes/observers",
    method: "observer",
  });
  await ComponentLoader.loadComponents({
    directoryPath: ELoadPath.CORE,
    componentDirectories: ["classes/observers"],
    directory: "",
    method: "observer",
  });
}
