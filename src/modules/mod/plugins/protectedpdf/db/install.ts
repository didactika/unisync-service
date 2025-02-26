import Module from "../../../classes/entities/module.entity";

const execute = async (): Promise<void> => {
  await createModExecute();
};

const createModExecute = async (): Promise<void> => {
  await new Module({
    name: "protectedpdf",
  }).create();
};

export default { execute };
