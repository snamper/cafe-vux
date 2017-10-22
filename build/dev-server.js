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
// body-parse define
const bodyParser = require('body-parser');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()

// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* define the data for ajax read */
const appData = require('../data.json')
const categorys = appData.categorys
const products = appData.products
const login = appData.login
const loginpoor = login.poor
const loginrich = login.rich
const loginfail = login.fail
const register = appData.register
const registerpoor = register.poor
const registerrich = register.rich
const registerother = register.other
const addValue = appData.addValue
const cartDetailList = appData.cartDetailList
const cartList = appData.cartList
const cartDetailList1 = appData.cartDetailList1


/* define router  */
var apiRoutes = express.Router()
apiRoutes.get('/category/show/ui/getCategoriedProducts.do', function (req, res) {
  res.json(categorys)
})

apiRoutes.post('/member/show/ui/memberLogin.do', jsonParser, function (req, res) {
  let user = req.body;
  console.log('memberLogin.do data is ');
  console.log(user);
  if(user.username==='totti'){
    res.json(loginpoor)
  } else if(user.username==='rich') {
    res.json(loginrich)
  } else {
    res.json(loginfail)
  }
})

apiRoutes.post('/member/show/ui/createMember.do', jsonParser, function (req, res) {
  let user = req.body;
  console.log('createMember.do data is ');
  console.log(user);
  if(user.username==="totti"){
    res.json(registerpoor)
  }else if(user.username==="david") {
    res.json(registerrich)
  }else{
    res.json(registerother)
  }
})

apiRoutes.post('/member/show/ui/isExistUserName.do', jsonParser, function (req, res) {
  let user = req.body;
  console.log('isExistUserName.do data is ' + JSON.stringify(user));
  if(user === 'totti' || user === 'david')
  {
    res.json('true')
  }else{
    res.json('false')
  }  
})

apiRoutes.get('/member/show/ui/rechargeBalance.do',function(req,res){
  res.json(addValue)
})

apiRoutes.get('/product/show/ui/saveRecordList.do',function(req,res){
  res.json('true')
})

apiRoutes.get('/product/show/ui/getDetailList.do',function(req,res){
  res.json('false')
})

apiRoutes.post('/product/show/ui/getRecordList.do',jsonParser,function(req,res){
  let user = req.body;
  if(user.userId !== ''){
    if(user.needDetail){
      // res.json(cartDetailList);
      res.json(cartDetailList1);
    }else{
      res.json(cartList);
    }
  }
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

const ipAddress = 'localhost'

// const uri = 'http://localhost:' + port

const uri = 'http://' + ipAddress + ':' + port

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
    // var uri = 'http://localhost:' + port
    // var uri = 'http://' + ipAddress + ':' + port
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
