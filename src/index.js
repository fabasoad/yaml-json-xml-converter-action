const core = require('@actions/core');
const { Converter } = require('./converter');

try {
  const converter = new Converter();
  core.setOutput("data", converter.convertFile(
    core.getInput('from'),
    core.getInput('to'),
    core.getInput('path')
  ));
} catch ({ message }) {
  core.setFailed(message);
}