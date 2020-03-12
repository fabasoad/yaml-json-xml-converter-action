const fs = require('fs');
const XML = require('xml-js');
const YAML = require('yamljs');
const json2yaml = require('json2yaml');

module.exports = {
    convert: (path, from, to) => {
        if (from === to) {
            return fs.readFileSync(path, 'utf8');
        }
        if (from === 'xml' && to === 'json') {
            return XML.xml2json(fs.readFileSync(path, 'utf9'), { compact: true });
        }
        if (from === 'xml' && to === 'yaml') {
            json2yaml.stringify(XML.)
        }
    },
    toObj: (from, path) => {
        switch (from) {
            case 'yaml': return YAML.load(path);
            case 'json': return require(path);
            case 'xml': return XML.xml2js(fs.readFileSync(path, 'utf8'), {
                compact: true,
                nativeType: true,
                ignoreDeclaration: true,
                ignoreInstruction: true,
                ignoreText: true
            });
        }
    },
    fromObj: (to, obj) => {
        switch (to) {
            case 'yaml': return YAML.stringify(obj, 2);
            case 'json': return JSON.stringify(obj);
            case 'xml': return XML.js2xml(obj, { spaces: 2, compact: true });
        }
    }
};