const fs = require('fs');
const json2yaml = require('json2yaml');
const json2xml = require('./json2xml');
const yaml2js = require('js-yaml');
const xmlParserFactory = require('xml-js-parse');

const convert = (from, to, content) => {
    if (from === to) {
        return content;
    }
    if (from === 'yaml' && to === 'json') {
        const obj = yaml2js.load(content);
        return JSON.stringify(obj);
    }
    if (from === 'yaml' && to === 'xml') {
        const obj = yaml2js.load(content);
        return json2xml(obj);
    }
    if (from === 'xml' && to === 'json') {
        const xmlParser = new xmlParserFactory.Parser({ explicitArray: false });
        return JSON.stringify(xmlParser.parseString(content));
    }
    if (from === 'xml' && to === 'yaml') {
        const xmlParser = new xmlParserFactory.Parser({ explicitArray: false });
        return json2yaml.stringify(xmlParser.parseString(content));
    }
    if (from === 'json' && to === 'xml') {
        return json2xml(JSON.parse(content));
    }
    if (from === 'json' && to === 'yaml') {
        return json2yaml.stringify(JSON.parse(content), 2);
    }
};

module.exports = {
    convertFile: (from, to, path) => {
        const content = fs.readFileSync(path, 'utf8');
        return convert(from, to, content);
    },
    convert: convert
};