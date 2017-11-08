const utils = require("./utils");

utils
  .postJson({
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
  .then(rep => {
    console.log(rep);
  });
