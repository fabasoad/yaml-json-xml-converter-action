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
      const obj = yaml2js.load(content);
      return to === 'json' ? JSON.stringify(obj) : json2xml(obj);
    case 'xml':
      const xmlParser = new xmlParserFactory.Parser({ explicitArray: false });
      const obj = xmlParser.parseString(content);
      return to === 'json' ? JSON.stringify(obj) : json2yaml.stringify(obj);
    case 'json':
      const obj = JSON.parse(content);
      return to === 'xml' ? json2xml(obj) : json2yaml.stringify(obj);
  }
};

module.exports = {
  convert: convert,
  convertFile: (from, to, path) => {
    const content = fs.readFileSync(path, 'utf8');
    return this.convert(from, to, content);
  }
};