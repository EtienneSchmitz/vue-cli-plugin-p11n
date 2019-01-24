jest.mock('/package.json', () => () => {}, { virtual: true })
const generateWithPlugin = require('@vue/cli-test-utils/generateWithPlugin')

test('docs', async () => {
  const projectName = 'vue-i18n-gen-docs'
  const { pkg, files } = await generateWithPlugin([{
    id: '@vue/cli-service',
    apply: () => {},
    options: { projectName }
  }, {
    id: 'p11n',
    apply: require('../../generator'),
    options: {}
  }])

  // check pkg
  expect(pkg.scripts['docs:serve']).toMatch('vue-cli-service docs --mode serve')
  expect(pkg.scripts['docs:build']).toMatch('vue-cli-service docs --mode build')

  // check files
  const installation = files['docs/installation.md']
  expect(installation).toMatch(`# Installation`)
  const readme = files['docs/README.md']
  expect(readme).toMatch(`# Introduction`)
  const started = files['docs/started.md']
  expect(started).toMatch(`# Getting Started`)
  const config = files['docs/.vuepress/config.js']
  expect(config).toMatch(`module.exports = {`)
})
