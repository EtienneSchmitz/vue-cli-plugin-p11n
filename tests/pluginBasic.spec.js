jest.setTimeout(300000)

const path = require('path')
const { create } = require('./helper')

test('basic project', async () => {
  const projectName = 'vue-i18n-basic'
  const project = await create(projectName, {
    plugins: {
      '@vue/cli-plugin-babel': {}
    }
  })
  expect(project.has('src/lib.js')).toBe(true)

  const targetService = path.join(
    project.dir,
    './node_modules/@vue/cli-service/bin/vue-cli-service.js'
  )
  await project.run(`${targetService} build`)
  const distFiles = [
    `dist/${projectName}.common.js`,
    `dist/${projectName}.umd.min.js`,
    `dist/${projectName}.umd.js`,
    `dist/${projectName}.esm.js`
  ]
  distFiles.forEach(file => { expect(project.has(file)).toBe(true) })
})