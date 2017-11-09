#!/usr/bin/env node
const commons = require('../src/commons.js');
const urlsync = require('urllib-sync');
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

  data.forEach(record => {
    let code = record['Indicator Code'];
    let name = record['Indicator Name'];
    desMap.set(code, [code,name]);
  });

  let des = Array.from(desMap.keys())
    .map(key => {
        let de = {};
        de.code = desMap.get(key)[0];
        de.name = desMap.get(key)[1] + ' (' + de.code + ')';
        de.shortName = de.code;
        de.aggregationType = 'SUM';
        de.domainType = 'AGGREGATE';
        de.valueType = 'NUMBER';
        de.zeroIsSignificant = false;
        return de;
    });

  console.info('Found data elements: ' + des.length);
  return des;
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

  let ous = Array.from(ousMap.keys())
    .map(key => {
        let ou = {};
        ou.code = ousMap.get(key)[0];
        ou.name = ousMap.get(key)[1] + ' (' + ou.code + ')';
        ou.shortName = ou.code;
        ou.openingDate = '1970-01-01';
        ou.parent = app.parentOrgUnit;
        return ou;
    });
  
  console.info('Found org units: ' + ous.length);
  return ous;
}

app.run();
