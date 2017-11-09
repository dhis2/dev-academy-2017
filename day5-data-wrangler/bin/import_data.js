#!/usr/bin/env node
const commons = require('../src/commons.js');
const urlsync = require('urllib-sync');
const app = {
  dvsUrl: commons.getConf().baseurl + '/api/dataValueSets?idScheme=code',
  years: ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015']
}

/**
 * Main function.
 */
app.run = function() {
  if (!commons.isArg('file')) {
    return console.log('Usage: import_data --file <file>');
  }

  const path = commons.getArgs().file;
  const data = commons.convertCsvToJson(path, app.importDataValues);
}

/**
 * Imports a data value set, one year at the time.
 */
app.importDataValues = function(data) {  
  app.years.forEach(year => {
    let dvs = data
      .map(d => {
        let dv = {};
        dv.dataElement = d['Indicator Code'];
        dv.orgUnit = d['Country Code'];
        dv.period = year;
        dv.value = d[dv.period];
        return dv;
      })
      .filter(d => d.value && d.value != '');
    
    console.info('Found data values: ' + dvs.length + ' for year: ' + year);
    app.postDataValues(dvs);
  });
}

/**
 * Posts the given data value set to the data value set API.
 */
app.postDataValues = function(dvs) {
  const payload = {};
  payload.dataValues = dvs;
  
  const options = commons.getOptions().post;
  options.headers = {
    'Content-Type': 'application/json'
  };
  options.content = JSON.stringify(payload);

  const resp = urlsync.request(app.dvsUrl, options);
  console.info('Posted data values');
}

app.run();
