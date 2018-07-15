var merge = require('C:/Users/lizhe/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
