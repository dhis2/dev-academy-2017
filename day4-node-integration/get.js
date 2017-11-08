const { fetchJson } = require("./utils");

fetchJson({ type: "dataElements" })
  .then(({ dataElements }) => dataElements.forEach(d => console.log(`${d.id} - ${d.name}`)))
  .catch(err => console.error(err));
