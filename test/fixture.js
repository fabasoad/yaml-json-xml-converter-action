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
        'from': 'yaml',
        'to': 'json'
    }, {
        'path': YAML_FILE,
        'from': 'yaml',
        'to': 'xml'
    }, {
        'path': XML_FILE,
        'from': 'xml',
        'to': 'json'
    }, {
        'path': XML_FILE,
        'from': 'xml',
        'to': 'yaml'
    }, {
        'path': JSON_FILE,
        'from': 'json',
        'to': 'yaml'
    }, {
        'path': JSON_FILE,
        'from': 'json',
        'to': 'xml'
    }]
};