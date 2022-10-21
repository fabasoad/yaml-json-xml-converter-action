const core = require('@actions/core');
const { Converter } = require('./converter');

try {
  const message = 'This GitHub action is deprecated and no longer maintained ' +
    'starting from 2022/10/21. Please use https://github.com/marketplace/acti' +
    'ons/data-format-converter-action instead. It is faster, can be run on an' +
    'y OS and supports much more data formats than this one.'
  core.warning(message, { title: 'Deprecation warning' });
  const converter = new Converter();
  core.setOutput('data', converter.convertFile(
    core.getInput('from'),
    core.getInput('to'),
    core.getInput('path')
  ));
} catch ({ message }) {
  core.setFailed(message);
}
