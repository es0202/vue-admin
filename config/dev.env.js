'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  NODE_ENV: '"development"',
  BASE_API: '"https://api-dev"',
  APP_ORIGIN: '"https://wallstreetcn.com"'
}
