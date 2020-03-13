# YAML/JSON/XML action
![CI](https://github.com/fabasoad/yaml-json-xml-converter-action/workflows/CI/badge.svg) ![YAML Lint](https://github.com/fabasoad/yaml-json-xml-converter-action/workflows/YAML%20Lint/badge.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/fabasoad/yaml-json-xml-converter-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/yaml-json-xml-converter-action/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fabasoad/yaml-json-xml-converter-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/yaml-json-xml-converter-action/context:javascript)

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
        id: converter1
        with:
          path: 'docker-compose.yml'
          from: 'yaml'
          to: 'xml'
      - name: Print converter result
        run: echo "${{ steps.converter1.outputs.data }}"
      - uses: fabasoad/yaml-json-xml-converter-action@v1.0.0
        id: converter2
        with:
          path: 'package.json'
          from: 'json'
          to: 'yaml'
      - name: Print converter result
        run: echo "${{ steps.converter2.outputs.data }}"
```

### Result
![Result](https://raw.githubusercontent.com/fabasoad/yaml-json-xml-converter-action/master/screenshot.png)

> If you define the same format for `from` and `to` parameters you can use this action to read the file :wink: