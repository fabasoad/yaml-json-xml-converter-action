const core = require('@actions/core');
const { convertFile } = require('./converter');

try {
  core.setOutput("data", convertFile(
    core.getInput('from'),
    core.getInput('to'),
    core.getInput('path')
  ));
} catch ({ message }) {
  core.setFailed(message);
}