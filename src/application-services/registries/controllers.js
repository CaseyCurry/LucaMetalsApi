import { StackController } from "../controllers/stack-controller";
import { Repositories } from "./repositories";

const Controllers = app => {
  const stackController = StackController(app, Repositories.stack);
  return {
    stack: stackController
  };
};

export { Controllers };
