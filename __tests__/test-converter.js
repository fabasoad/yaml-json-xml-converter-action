const fs = require('fs');
const itParam = require('mocha-param');

const { convert, convertFile } = require('../src/converter');
const fixture = require('./fixture');

let yaml, xml, json;

describe("Test converter", () => {
    before(() => {
        yaml = `server:
  version: 1
  modules:
  - "test1"
  - "test2"`;
        json = '{"server":{"version":1,"modules":["test1","test2"]}}';
        xml = '<server><version>1</version><modules>test1</modules><modules>test2</modules></server>';

        fs.writeFileSync(fixture.paths.yaml, yaml);
        fs.writeFileSync(fixture.paths.json, json);
        fs.writeFileSync(fixture.paths.xml, xml);
    });

    itParam("${value.pipe} convertion should be backward compatible", fixture.args, function (arg) {
        const expected = convertFile(arg.pipe[0], arg.pipe[0], arg.path);
        const pipe1 = convert(arg.pipe[0], arg.pipe[1], expected);
        const pipe2 = convert(arg.pipe[1], arg.pipe[2], pipe1);
        const actual = convert(arg.pipe[2], arg.pipe[0], pipe2);
        if (!arg.validate(expected) || !arg.validate(actual)) {
            throw new Error(`Pipe ${arg.pipe[0]} -> ${arg.pipe[1]} -> ${arg.pipe[2]} -> ${arg.pipe[0]} is invalid.`);
        }
    });

    after(() => {
        fs.unlinkSync(fixture.paths.yaml);
        fs.unlinkSync(fixture.paths.json);
        fs.unlinkSync(fixture.paths.xml);
    });
});