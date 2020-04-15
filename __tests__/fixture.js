const validator = require('./fixture-validators');

const YAML_FILE = './test.yml';
const JSON_FILE = './test.json';
const XML_FILE = './test.xml';

module.exports = {
  'paths': {
    'yaml': YAML_FILE,
    'json': JSON_FILE,
    'xml': XML_FILE
  },
  'args': [{
    'path': YAML_FILE,
    'validate': validator.validateYAML,
    'pipe': ['yaml', 'json', 'xml']
  }, {
    'path': YAML_FILE,
    'validate': validator.validateYAML,
    'pipe': ['yaml', 'xml', 'json']
  }, {
    'path': XML_FILE,
    'validate': validator.validateXML,
    'pipe': ['xml', 'yaml', 'json']
  }, {
    'path': XML_FILE,
    'validate': validator.validateXML,
    'pipe': ['xml', 'json', 'yaml']
  }, {
    'path': JSON_FILE,
    'validate': validator.validateJSON,
    'pipe': ['json', 'xml', 'yaml']
  }, {
    'path': JSON_FILE,
    'validate': validator.validateJSON,
    'pipe': ['json', 'yaml', 'xml']
  }]
};