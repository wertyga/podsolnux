const path = require('path')

const rootPath = process.cwd()
const outputPath = path.join(rootPath, './PUBLIC/static')
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  outputPath,
  rootPath,
  isProd,
}