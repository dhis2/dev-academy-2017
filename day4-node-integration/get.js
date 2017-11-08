const utils = require("./utils");

utils.fetchJson({ type: "dataElements" }).then(d => {
  console.log(d);
});
