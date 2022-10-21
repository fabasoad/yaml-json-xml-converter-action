const core = require('@actions/core');
const { Converter } = require('./converter');

try {
  core.notice('NOTICE! test 1');
  core.warning('Warning! test 2');
  core.error('ERROR! test 3');
  const converter = new Converter();
  core.setOutput('data', converter.convertFile(
    core.getInput('from'),
    core.getInput('to'),
    core.getInput('path')
  ));
} catch ({ message }) {
  core.setFailed(message);
}
