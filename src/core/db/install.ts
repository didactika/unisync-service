import environment from "../../config/environment";
import Context from "../classes/entities/context-entity";
import Level from "../classes/entities/level-entity";

/**
 * This function is used to install the core module database tables
 * @returns {void}
 */
const execute = async (): Promise<void> => {
  await levelExecute();
  await contextExecute();
};

const levelExecute = async (): Promise<void> => {
  await new Level({
    name: "course",
  }).create();

  await new Level({
    name: "section",
  }).create();

  await new Level({
    name: "mod",
  }).create();

  await new Level({
    name: "grouping",
  }).create();

  await new Level({
    name: "group",
  }).create();
};

const contextExecute = async (): Promise<void> => {
  await new Context({
    name: "course",
  }).create();

  await new Context({
    name: "system_course",
  }).create();

  await new Context({
    name: "template_course",
  }).create();
}

export default { execute };
