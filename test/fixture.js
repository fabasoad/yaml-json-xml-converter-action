const fs = require('fs');
const validateYAMLSchema = require('yaml-schema-validator');
const JSONValidator = require('jsonschema').Validator;

const TEST_FILE_NAME = 'W2EuTssxe1PA';

const validateYAML = (content) => {
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
};
const validateJSON = (content) => {
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
            "server": {"$ref": "/ServerContentSchema"},
            "required": ["server"]
        }
    };
    v.addSchema(serverContentSchema, "/ServerContentSchema");
    const result = v.validate(JSON.parse(content), serverSchema);
    return result.valid;
};
const validateXML = (content) => false;

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
        'validate': validateYAML,
        'pipe': ['yaml','json','xml']
    }, {
        'path': YAML_FILE,
        'validate': validateYAML,
        'pipe': ['yaml','xml','json']
    }, {
        'path': XML_FILE,
        'validate': validateXML,
        'pipe': ['xml', 'yaml', 'json']
    }, {
        'path': XML_FILE,
        'validate': validateXML,
        'pipe': ['xml','json','yaml']
    }, {
        'path': JSON_FILE,
        'validate': validateJSON,
        'pipe': ['json','xml','yaml']
    }, {
        'path': JSON_FILE,
        'validate': validateJSON,
        'pipe': ['json','yaml','xml']
    }]
};