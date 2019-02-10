import fetch from "node-fetch";
import { StackStore } from "../../infrastructure/couchdb/stores/stack-store";

const stackStore = StackStore(fetch, process.env.DATABASE_URL);

const Datastores = {
  stack: stackStore
};

export { Datastores };
