import { VersionInfo } from "../../types/version-info";

export default {
  component: "subsystem_mod",
  version: "1.0.0",
  release: "2024-06-16",
  requirements: [
    {
      module: "system",
      version: "1.0.0",
    },
    {
        module: "subsystem_course",
        version: "1.0.0",
    }
  ],
} as VersionInfo;
