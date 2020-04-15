const fs = require('fs');
const json2yaml = require('json2yaml');
const json2xml = require('./json2xml');
const yaml2js = require('js-yaml');
const xmlParserFactory = require('xml-js-parse');

const SUPPORTED_FORMATS = ['yaml','json','xml'];

const validate = (from, to) => {
  if (!SUPPORTED_FORMATS.includes(from)) {
    throw new Error(`${from} format is not supported`);
  }
  if (!SUPPORTED_FORMATS.includes(to)) {
    throw new Error(`${to} format is not supported`);
  }
};

const convert = (from, to, content) => {
  if (from === to) {
    return content;
  }
  validate(from, to);
  switch (from) {
    case 'yaml':
      const yamlObject = yaml2js.load(content);
      return to === 'json' ? JSON.stringify(yamlObject) : json2xml(yamlObject);
    case 'xml':
      const xmlParser = new xmlParserFactory.Parser({ explicitArray: false });
      const xmlObject = xmlParser.parseString(content);
      return to === 'json' ? JSON.stringify(xmlObject) : json2yaml.stringify(xmlObject);
    case 'json':
      const jsonObject = JSON.parse(content);
      return to === 'xml' ? json2xml(jsonObject) : json2yaml.stringify(jsonObject);
  }
};

module.exports = {
  convert: convert,
  convertFile: (from, to, path) => {
    const content = fs.readFileSync(path, 'utf8');
    return convert(from, to, content);
  }
};