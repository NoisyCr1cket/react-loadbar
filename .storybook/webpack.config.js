// https://storybook.js.org/configurations/custom-webpack-config/
// load the default config generator
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const autoprefixer = require('autoprefixer')
const webpackDev = require('../webpack.config.dev')
const push = Array.prototype.push

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)
  // (Extend as needed)
  push.apply(config.module.rules, webpackDev.module.rules)
  push.apply(config.resolve.extensions, webpackDev.resolve.extensions)
  return config
}