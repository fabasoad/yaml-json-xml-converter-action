const core = require('@actions/core');
const fs = require('fs');
const XML = require('xml-js');
const YAML = require('yamljs');

const toObj = {
    'yaml': (path) => YAML.load(path),
    'json': (path) => require(path),
    'xml': (path) => XML.xml2js(fs.readFileSync(path, 'utf8'), { compact: true, spaces: 2 })
};

const fromObj = {
    'yaml': (obj) => YAML.stringify(obj, 2),
    'json': (obj) => JSON.stringify(obj),
    'xml': (obj) => XML.js2xml(obj, { spaces: 2, compact: true })
};

try {
  const path = core.getInput('path');
  const from = core.getInput('from');
  const to = core.getInput('to');
  core.setOutput("data", fromObj[to](toObj[from](path)));
} catch (error) {
  core.setFailed(error.message);
}