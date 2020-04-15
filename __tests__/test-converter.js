const fs = require('fs');
const itParam = require('mocha-param');
const { assert } = require('chai');

const { Converter, ConverterValidationError } = require('../src/converter');
const fixture = require('./fixture');

let yaml, xml, json;

describe("Test converter", () => {
  let converter;

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

    converter = new Converter();
  });

  itParam("${value.pipe} convertion should be backward compatible", fixture.args, function (arg) {
    const expected = converter.convertFile(arg.pipe[0], arg.pipe[0], arg.path);
    const pipe1 = converter.convert(arg.pipe[0], arg.pipe[1], expected);
    const pipe2 = converter.convert(arg.pipe[1], arg.pipe[2], pipe1);
    const actual = converter.convert(arg.pipe[2], arg.pipe[0], pipe2);
    if (!arg.validate(expected) || !arg.validate(actual)) {
      throw new Error(`Pipe ${arg.pipe[0]} -> ${arg.pipe[1]} -> ${arg.pipe[2]} -> ${arg.pipe[0]} is invalid.`);
    }
  });

  it("should not convert invalid format", () => {
    const validFormat = 'json';
    const invalidFormat = 'eo77i23y';
    const jsonContent = '[]';
    try {
      converter.convert(validFormat, invalidFormat, jsonContent);
    } catch (e) {
      if (e instanceof ConverterValidationError) {
        try {
          converter.convert(invalidFormat, validFormat, jsonContent);
        } catch (e) {
          if (e instanceof ConverterValidationError) {
            return;
          }
        }
      }
    }
    assert.Throw();
  });

  after(() => {
    fs.unlinkSync(fixture.paths.yaml);
    fs.unlinkSync(fixture.paths.json);
    fs.unlinkSync(fixture.paths.xml);
  });
});