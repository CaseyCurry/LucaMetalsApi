import buildStore from "./build-store";

const StackStore = (http, baseUrl) => {
  const url = `${baseUrl}metals%2Fstacks/`;
  return {
    url,
    http,
    build: () => {
      const views = {
        views: {
          "tenant-stacks": {
            map: "function (doc) {\n  emit(doc.tenantId, null);\n}"
          }
        },
        language: "javascript"
      };
      return buildStore(http, url, views);
    }
  };
};

export { StackStore };
