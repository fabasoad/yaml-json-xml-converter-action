const fs = require('fs');
const json2yaml = require('json2yaml');
const json2xml = require('./json2xml');
const yaml2js = require('js-yaml');
const { Parser } = require('xml-js-parse');

class ConverterValidationError extends Error {
  constructor(message) {
    super(message);
  }
}

class Converter {
  constructor() {
    this.SUPPORTED_FORMATS = ['yaml', 'json', 'xml'];
    this.xmlParser = new Parser({ explicitArray: false });
  }

  _validate(from, to) {
    if (!this.SUPPORTED_FORMATS.includes(from)) {
      throw new ConverterValidationError(`${from} format is not supported`);
    }
    if (!this.SUPPORTED_FORMATS.includes(to)) {
      throw new ConverterValidationError(`${to} format is not supported`);
    }
  }

  convert(from, to, content) {
    if (from === to) {
      return content;
    }
    this._validate(from, to);
    switch (from) {
    case 'yaml':
      const yamlObject = yaml2js.load(content);
      return to === 'json' ? JSON.stringify(yamlObject) : json2xml(yamlObject);
    case 'xml':
      const xmlObject = this.xmlParser.parseString(content);
      return to === 'json' ?
        JSON.stringify(xmlObject) : json2yaml.stringify(xmlObject);
    case 'json':
      const jsonObject = JSON.parse(content);
      return to === 'xml' ?
        json2xml(jsonObject) : json2yaml.stringify(jsonObject);
    }
  }

  convertFile(from, to, path) {
    const content = fs.readFileSync(path, 'utf8');
    return this.convert(from, to, content);
  }
}

module.exports = { Converter, ConverterValidationError };
