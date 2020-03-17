const core = require('@actions/core');
const converter = require('./converter');

try {
  const path = core.getInput('path');
  const from = core.getInput('from');
  const to = core.getInput('to');
  core.setOutput("data", converter.convertFile(from, to, path));
} catch (error) {
  core.setFailed(error.message);
}