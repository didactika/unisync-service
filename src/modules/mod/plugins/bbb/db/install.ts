import Module from "../../../classes/entities/module.entity";

const execute = async (): Promise<void> => {
  await createModExecute();
};

const createModExecute = async (): Promise<void> => {
  await new Module({
    name: "bbb",
  }).create();
};

export default { execute };
