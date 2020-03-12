const fs = require('fs');
const itParam = require('mocha-param');

const converter = require('../converter');
const fixture = require('./fixture');

let yaml, xml, json;

describe("Test converter", () => {
    before(() => {
        yaml = `server:
  version: 1
  modules:
  - test1
  - test2`;
        json = '{"server":{"version":1,"modules":["test1","test2"]}}';
        xml = '<server><version>1</version><modules>test1</modules><modules>test2</modules></server>';
    
        const callback = err => {
            if (err) throw err
        };

        fs.writeFile(fixture.paths.yaml, yaml, callback);
        fs.writeFile(fixture.paths.json, json, callback);
        fs.writeFile(fixture.paths.xml, xml, callback);
    });

    itParam("${value.from} -> ${value.to}", fixture.args, function (arg) {
        const obj = converter.toObj(arg.from, arg.path);
        const result = converter.fromObj(arg.to, obj);
        console.log(result);
    });

    after(() => {
        const callback = err => {
            if (err) throw err
        };

        fs.unlink(fixture.paths.yaml, callback);
        fs.unlink(fixture.paths.json, callback);
        fs.unlink(fixture.paths.xml, callback);
    });
});