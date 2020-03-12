# YAML/JSON/XML action
![YAML Lint](https://github.com/fabasoad/yaml-json-xml-converter-action/workflows/YAML%20Lint/badge.svg)

This action takes file that in YAML/JSON/XML format and produces it in output in YAML/JSON/XML format.

## Inputs

### `path`

_[Required]_ Path to the file to be converted.

### `from`

_[Required]_ Format of a file. Possible values: `json`, `xml`, `yaml`.

### `to`

_[Required]_ Format of a file as a result. Possible values: `json`, `xml`, `yaml`.

## Outputs

### `data`

Result in a format defined in `to` argument.

## Example usage

### YAML to JSON
1. Workflow configuration

```yaml
name: YAML to JSON

on: push

jobs:
  converter:
    name: Run YAML to JSON
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: fabasoad/yaml-json-xml-converter-action@v1.0.0
        id: converter
        with:
          path: 'conf.yml'
          from: 'yaml'
          to: 'json'
      - name: Print converter result
        run: echo "${{ steps.converter.outputs.data }}"
```

2. Result
![Result](https://raw.githubusercontent.com/fabasoad/yaml-json-xml-converter-action/master/screenshot-yaml-json.png)

### JSON to XML
1. Workflow configuration

```yaml
name: JSON to XML

on: push

jobs:
  converter:
    name: Run JSON to XML
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: fabasoad/yaml-json-xml-converter-action@v1.0.0
        id: converter
        with:
          path: 'package.json'
          from: 'json'
          to: 'xml'
      - name: Print converter result
        run: echo "${{ steps.converter.outputs.data }}"
```

2. Result
![Result](https://raw.githubusercontent.com/fabasoad/yaml-json-xml-converter-action/master/screenshot-json-xml.png)