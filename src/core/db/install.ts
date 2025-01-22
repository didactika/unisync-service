import Level from "../classes/entities/level-entity";

/**
 * This function is used to install the core module database tables
 * @returns {void}
 */
const execute = async (): Promise<void> => {
  await levelExecute();
};

const levelExecute = async (): Promise<void> => {
  await new Level({
    name: "course",
  }).create();

  await new Level({
    name: "section",
  }).create();

  await new Level({
    name: "course_module",
  }).create();

  await new Level({
    name: "grouping",
  }).create();

  await new Level({
    name: "group",
  }).create();
};

export default { execute };
