# YAML/JSON/XML action
![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/fabasoad/yaml-json-xml-converter-action?include_prereleases) ![CI](https://github.com/fabasoad/yaml-json-xml-converter-action/workflows/CI/badge.svg) ![YAML Lint](https://github.com/fabasoad/yaml-json-xml-converter-action/workflows/YAML%20Lint/badge.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/fabasoad/yaml-json-xml-converter-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/yaml-json-xml-converter-action/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fabasoad/yaml-json-xml-converter-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/yaml-json-xml-converter-action/context:javascript) [![Known Vulnerabilities](https://snyk.io/test/github/fabasoad/yaml-json-xml-converter-action/badge.svg)](https://snyk.io/test/github/fabasoad/yaml-json-xml-converter-action) [![Maintainability](https://api.codeclimate.com/v1/badges/2e14282fa64af03f16b5/maintainability)](https://codeclimate.com/github/fabasoad/yaml-json-xml-converter-action/maintainability)

Converts YAML/JSON/XML file formats interchangeably..

## Inputs

1. `path` - _[Required]_ Path to the file to be converted.
2. `from` - _[Required]_ Format of a file. Possible values: `json`, `xml`, `yaml`.
3. `to` - _[Required]_ Format of a file as a result. Possible values: `json`, `xml`, `yaml`.

## Outputs

1. `data` - Result in a format defined in `to` argument.

## Example usage

### Prerequisites
1. `docker-compose.yml` file that will be transformed into XML file.
```yaml
---
version: '3.7'
services:
  mongo:
    image: mongo:4.2.3-bionic
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: abc123
    networks:
      - test-network

networks:
  test-network:
    name: test-network
    driver: bridge
```
2. `person.json` file that will be transformed into YAML file.
```json
{
    "name": "John Doe",
    "age": 32,
    "hobbies": ["Music", "PC Games"]
}
```

### Workflow configuration

```yaml
name: Convert

on: push

jobs:
  converter:
    name: Run converter
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: fabasoad/yaml-json-xml-converter-action@v1.0.0
        id: yaml2xml
        with:
          path: 'docker-compose.yml'
          from: 'yaml'
          to: 'xml'
      - name: Print yaml2xml result
        run: echo "${{ steps.yaml2xml.outputs.data }}"
      - uses: fabasoad/yaml-json-xml-converter-action@v1.0.0
        id: json2yaml
        with:
          path: 'package.json'
          from: 'json'
          to: 'yaml'
      - name: Print json2yaml result
        run: echo "${{ steps.json2yaml.outputs.data }}"
```

### Result
![Result](https://raw.githubusercontent.com/fabasoad/yaml-json-xml-converter-action/master/screenshot.png)

> _Hint:_ If you define the same format for `from` and `to` parameters you can use this action to read the file :wink:
