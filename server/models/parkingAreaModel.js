const { DocumentStore } = require("ravendb");
const ravenConfig = require("../config/ravenConfig");

const store = new DocumentStore(
  ravenConfig.serverUrl,
  ravenConfig.databaseName
);
store.initialize();

module.exports = store;
