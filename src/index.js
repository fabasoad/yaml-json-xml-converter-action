const core = require('@actions/core');
const { Converter } = require('./converter');

try {
  core.notice('This GHA is deprecated starting from 2022/10/21', {
    title: 'Deprecation notice'
  });
  core.warning('This GHA is deprecated starting from 2022/10/21', {
    title: 'Deprecation warning'
  });
  core.error('This GHA is deprecated starting from 2022/10/21', {
    title: 'Deprecation warning'
  });
  const converter = new Converter();
  core.setOutput('data', converter.convertFile(
    core.getInput('from'),
    core.getInput('to'),
    core.getInput('path')
  ));
} catch ({ message }) {
  core.setFailed(message);
}
