const fs = require('fs');
const validateYAMLSchema = require('yaml-schema-validator');
const JSONValidator = require('jsonschema').Validator;
const xmllint = require('xmllint');

const TEST_FILE_NAME = 'W2EuTssxe1PA';

module.exports = {
  validateYAML: (content) => {
    const path = `./${TEST_FILE_NAME}.yml`;
    fs.writeFileSync(path, content);
    const result = validateYAMLSchema(path, {
      logLevel: 'none',
      schema: {
        "server": {
          "version": {
            "required": true
          },
          "modules": [{ "required": true }]
        }
      }
    });
    fs.unlinkSync(path);
    return result.length === 0;
  },
  validateJSON: (content) => {
    const v = new JSONValidator();
    const serverContentSchema = {
      "id": "/ServerContentSchema",
      "type": "object",
      "properties": {
        "modules": {
          "type": "array",
          "items": { "type": "string" }
        },
        "version": { "type": "Number" },
        "required": ["modules", "version"]
      }
    };
    const serverSchema = {
      "id": "/ServerSchema",
      "type": "object",
      "properties": {
        "server": { "$ref": "/ServerContentSchema" },
        "required": ["server"]
      }
    };
    v.addSchema(serverContentSchema, "/ServerContentSchema");
    const result = v.validate(JSON.parse(content), serverSchema);
    return result.valid;
  },
  validateXML: (content) => {
    const result = xmllint.validateXML({
      xml: content,
      schema: `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">
            <xs:element name="server">
            <xs:complexType>
                <xs:sequence>
                <xs:element type="xs:byte" name="version"/>
                <xs:element type="xs:string" name="modules" maxOccurs="unbounded" minOccurs="0"/>
                </xs:sequence>
            </xs:complexType>
            </xs:element>
        </xs:schema>`
    });
    return !(result.errors && result.errors.length > 0);
  }
};