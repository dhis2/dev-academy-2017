const fs = require('fs');
const argv = require('yargs').argv;
const csvtojson = require('csvtojson');

/**
* Main namespace.
*/
const cnf = {
  config: undefined,
  configFile: undefined,
  configLocation: undefined,
  configFilename: 'datawrangler.json'
}

/**
* Returns the config.
*/
cnf.getConf = function() {
  if (cnf.config) {
    return cnf.config;
  }
  else {
    return cnf.initAndGetConf();
  }
}

/**
* Returns a basic authentication string.
*/
cnf.getAuth = function() {
  return cnf.getConf().username + ':' + cnf.getConf().password;
}

/**
* Returns a JSON suitable for network operations.
*/
cnf.getOptions = function() {
  return {
    get: {
      auth: cnf.getAuth(),
      method: 'get',
      timeout: 3600000
    },
    post: {
      auth: cnf.getAuth(),
      method: 'post',
      timeout: 3600000,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };
}

/**
* Returns the command line arguments as an object.
*/
cnf.getArgs = function() {
  return argv;
}

/**
* Indicates if the given argument was provided from the command line.
* @param arg the argument.
*/
cnf.isArg = function(arg) {
  return !!(argv[arg] && argv[arg].length);
}

/**
 * Reads the CSV file and converts the content to JSON.
 * @param doneFn callback to apply with the JSON structure.
 */
cnf.convertCsvToJson = function(path, doneFn) {
    const Converter = require('csvtojson').Converter;
    const converter = new Converter({});
    converter.on('end_parsed', doneFn);
    fs.createReadStream(path).pipe(converter);
}

/**
* Initalizes configuration.
*/
cnf.initAndGetConf = function() {
  const dhisHome = process.env.DHIS2_HOME;

  if (dhisHome) {
    cnf.configLocation = dhisHome + '/' + cnf.configFilename;
    console.log('Using DHIS2_HOME environment variable pointing to: ' + cnf.configLocation);
  }
  else {
    cnf.configLocation = cnf.configFilename;
    console.log('Falling back to default config location: ' + cnf.configLocation);
  }

  try {
    cnf.configFile = fs.readFileSync(cnf.configLocation, 'utf8');
  }
  catch (ex) {
    throw new Error('Configuration file ' + cnf.configFilename + ' was not found or could not be parsed');
  }

  cnf.config = JSON.parse(cnf.configFile);
  return cnf.config;
}

/**
* Public functions.
*/
module.exports.getConf = cnf.getConf;
module.exports.getAuth = cnf.getAuth;
module.exports.getOptions = cnf.getOptions;
module.exports.getArgs = cnf.getArgs;
module.exports.isArg = cnf.isArg;
module.exports.convertCsvToJson = cnf.convertCsvToJson;
