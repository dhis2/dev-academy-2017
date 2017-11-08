const xlsx = require("xlsx");
const { postJson } = require("./utils");

const workbook = xlsx.readFile("./data.xlsx");
const rows = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

const dataElements = rows.map(o => ({
  id: o.uid,
  name: o.name,
  shortName: o.shortName,
  domainType: "AGGREGATE",
  valueType: o.type,
  aggregationType: o.aggregation
}));

postJson({
  dataElements
}).then(report => {
  console.log(report);
});
