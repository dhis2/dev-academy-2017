const { postJson } = require("./utils");

postJson({
  dataElements: [
    {
      id: "gpwKG7mSDeS",
      name: "DE Created From Node",
      shortName: "DE Node",
      domainType: "AGGREGATE",
      aggregationType: "SUM",
      valueType: "NUMBER"
    }
  ]
})
  .then(report => console.log(report))
  .catch(err => console.error(err));
