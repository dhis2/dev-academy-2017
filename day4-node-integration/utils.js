const fetch = require("node-fetch");
const access = require("./access.json");

const defaultHeaders = {
  Accept: "application/json; charset=UTF-8",
  "Content-Type": "application/json; charset=UTF-8"
};

const getAuthorization = (username, password) => {
  return "Basic " + new Buffer(username + ":" + password).toString("base64");
};

const fetchJson = async ({ type, paging = false, fields = "*" }) => {
  const headers = Object.assign({}, defaultHeaders, {
    Authorization: getAuthorization(access.username, access.password)
  });

  try {
    const req = await fetch(`${access.url}/api/${type}?paging=${paging}&fields=${fields}`, {
      headers
    });

    if (req.ok) {
      return await req.json();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const postJson = async md => {
  const headers = Object.assign({}, defaultHeaders, {
    Authorization: getAuthorization(access.username, access.password)
  });

  try {
    const req = await fetch(`${access.url}/api/metadata`, {
      method: "POST",
      headers,
      body: JSON.stringify(md)
    });

    if (req.ok) {
      return await req.json();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  fetchJson, postJson, getAuthorization
};
