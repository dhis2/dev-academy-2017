#!/usr/bin/env node
const commons = require('../src/commons.js');
const urlsync = require('urllib-sync');
const util = require('util');
const app = {
  metadataUrl: commons.getConf().baseurl + '/api/metadata?async=false',
  parentOrgUnit: {
    id: 'wMEsYBP41Z8'
  }
}

/**
 * Main function.
 */
app.run = function() {
  if (!commons.isArg('file')) {
    return console.log('Usage: import_metadata --file <file>');
  }

  const path = commons.getArgs().file;
  const data = commons.convertCsvToJson(path, app.importMetadata);
}

/**
 * Imports metadata.
 */
app.importMetadata = function(data) {
  const metadata = app.getMetadata(data);
  
  console.info(util.format('Found %d data elements and %d org units in metadata', 
    metadata.dataElements.length, metadata.organisationUnits.length));
  console.debug(JSON.stringify(metadata));

  app.postMetadata(metadata);
}

/**
 * Posts the given metadata to the metadata API.
 */
app.postMetadata = function(metadata) {
  const options = commons.getOptions().post;
  options.content = JSON.stringify(metadata);

  const resp = urlsync.request(app.metadataUrl, options);
  console.info('Posted metadata');
}

/**
 * Collects and returns the unique metadata objects from the data.
 */
app.getMetadata = function(data) {
  return {
    dataElements: app.getDataElements(data),
    organisationUnits: app.getOrgUnits(data)
  };
}

/**
 * Collects and returns the unique data elements (indicators) from the data.
 */
app.getDataElements = function(data) {
  let desMap = new Map();
  data.forEach(row => {
    let code = row['Indicator Code'];
    let name = row['Indicator Name'];
    desMap.set(code, [code,name]);
  });

  return Array.from(desMap.keys())
    .map(key => {
      let code = desMap.get(key)[0];
      let name = desMap.get(key)[1];
      return {
        code: code,
        name: name + ' (' + code + ')',
        shortName: code,
        aggregationType: 'SUM',
        domainType: 'AGGREGATE',
        valueType: 'NUMBER',
        zeroIsSignificant: false
      };
    });
}

/**
 * Collects and returns the unique org units (countries) from the data.
 */
app.getOrgUnits = function(data) {
  let ousMap = new Map();
  data.forEach(record => {
    let code = record['Country Code'];
    let name = record['Country Name'];
    ousMap.set(code, [code,name]);
  });

  return Array.from(ousMap.keys())
    .map(key => {
      let code = ousMap.get(key)[0];
      let name = ousMap.get(key)[1];
      return {
        code: code,
        name: name + ' (' + code + ')',
        shortName: code,
        openingDate: '1970-01-01',
        parent: app.parentOrgUnit
      };
    });
}

app.run();
