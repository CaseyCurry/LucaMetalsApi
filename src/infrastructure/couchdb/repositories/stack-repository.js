// TODO: unit test
import { Stack } from "../../../domain/aggregates/stack";

const extendStack = stack => {
  return Object.assign({}, stack, {
    _id: stack.id
  });
};

const StackRepository = datastore => {
  return {
    create: stack => {
      const extendedStack = extendStack(stack);
      return datastore.http(datastore.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extendedStack)
      });
    },
    update: stack => {
      const extendedStack = extendStack(stack);
      return datastore.http(`${datastore.url}${stack.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extendedStack)
      });
    },
    getById: id => {
      const url = `${datastore.url}${id}`;
      return datastore
        .http(url)
        .then(response => response.json())
        .then(body => new Stack(body));
    },
    getStacks: tenantId => {
      let url = `${
        datastore.url
      }_design/doc/_view/tenant-stacks?include_docs=true&key="${tenantId}"`;
      return datastore
        .http(url)
        .then(response => response.json())
        .then(body => {
          return body.rows.map(row => new Stack(row.doc));
        });
    }
  };
};

export { StackRepository };
