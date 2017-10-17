'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()

/* define the data for ajax read */
const appData = require('../data.json')
const categorys = appData.categorys
const products = appData.products
const login = appData.login
const cartlist = appData.cartlist
const register = appData.register
const addValue = appData.addValue


/* define router  */
var apiRoutes = express.Router()
apiRoutes.get('/category/show/ui/getCategoriedProducts.do', function (req, res) {
  res.json({
    data: categorys
  })
})

apiRoutes.get('/product/show/ui/getProducts.do', function (req, res) {
  res.json({
    data: products
  })
})

apiRoutes.get('/member/show/ui/memberLogin.do', function (req, res) {
  res.json({
    /* login success */
    data: login.success
    /* login fail */
    /* data: login.fail */
  })
})

apiRoutes.get('/member/show/ui/createMember.do', function (req, res) {
  res.json({
    data: register
  })
})

apiRoutes.get('/member/show/ui/isExistUserName.do', function (req, res) {
  res.json({
    /* true: duiplicate name */
    data: true
  })
})

apiRoutes.get('/product/show/ui/getRecordList.do',function(req,res){
  res.json({
    data: cartlist
  })
})

apiRoutes.get('/member/show/ui/rechargeBalance.do',function(req,res){
  res.json({
    data:addValue
  })
})

apiRoutes.get('/product/show/ui/saveRecordList.do',function(req,res){
  res.json({
    data: true
  })
})


/* setting router address */
app.use('/shop', apiRoutes);

const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
