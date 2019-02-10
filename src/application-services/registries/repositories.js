import { Datastores } from "./datastores";
import { StackRepository } from "../../infrastructure/couchdb/repositories/stack-repository";

const stackRepository = StackRepository(Datastores.stack);

const Repositories = {
  stack: stackRepository
};

export { Repositories };
