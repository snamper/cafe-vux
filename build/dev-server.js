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
const bodyParser = require('body-parser')

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
// 商品
const categorys = appData.categorys
// 登陆
const login = appData.login
// 注册
const register = appData.register
// 购买记录
const recordList = appData.recordList
// 提醒卖家
const alterStatus = appData.alterStatus
// 修改信息
const modifyMemberInfo = appData.modifyMemberInfo
// 修改密码
const modifyPwd = appData.modifyPwd
// 商品购买接口
const saverecord = appData.saverecord
// 是否用户名已存在
const duplicate = appData.duplicate

/* define router  */
var apiRoutes = express.Router()

// 获取分类商品的列表
apiRoutes.get('/category/show/ui/getCategoriedProducts.do', function (req, res) {
  res.json(categorys)
})

// 修改会员信息接口
apiRoutes.post('/member/show/ui/modifyBasicInfo.do', jsonParser, function(req, res){
  let user = req.body
  console.log('modifyBasicInfo.do data is ' +JSON.stringify(user));
  if (user.userId === login.member0.id || user.userId === login.member2.id || user.userId === login.member4.id || user.userId === login.member6.id
    || user.userId === login.member8.id) {
      res.json(modifyMemberInfo.success)
  } else {
    res.json(modifyMemberInfo.fail)
  }
})

// 修改密码接口
apiRoutes.post('/member/show/ui/modifyPassword.do', jsonParser, function(req, res){
  let user = req.body
  console.log('modifyPassword.do data is ' +JSON.stringify(user));
  if (user.userId === login.member1.id || user.userId === login.member3.id || user.userId === login.member5.id || user.userId === login.member7.id
    || user.userId === login.member9.id) {
      res.json(modifyPwd.success)
  } else {
    res.json(modifyPwd.fail)
  }
})

// 用户登录接口
apiRoutes.post('/member/show/ui/memberLogin.do', jsonParser, function (req, res) {
  // {"name":"ccc","passWd":"dad"}
  let user = req.body;
  console.log('memberLogin.do data is ' +JSON.stringify(user));
  if (user.name === login.member0.phone) {
    res.json(login.member0)
  } else if (user.name === login.member1.phone) {
    res.json(login.member1)
  } else if (user.name === login.member2.phone) {
    res.json(login.member2)
  } else if (user.name === login.member3.phone) {
    res.json(login.member3)
  } else if (user.name === login.member4.phone) {
    res.json(login.member4)
  } else if (user.name === login.member5.phone) {
    res.json(login.member5)
  } else if (user.name === login.member6.phone) {
    res.json(login.member6)
  } else if (user.name === login.member7.phone) {
    res.json(login.member7)
  } else if (user.name === login.member8.phone) {
    res.json(login.member8)
  } else if (user.name === login.member9.phone) {
    res.json(login.member9)
  } else {
    res.json(login.fail)
  }
})

// 用户注册接口
apiRoutes.post('/member/show/ui/createMember.do', jsonParser, function (req, res) {
  let user = req.body;
  console.log('createMember.do data is ' + JSON.stringify(user));
  if (user.name !== '18982278872') {
    res.json(register.success)
  } else {
    res.json(register.fail)
  }
})

// 是否用户名已存在
apiRoutes.post('/member/show/ui/isExistUserName.do', jsonParser, function (req, res) {
  // {"entityName":"test"}
  let user = req.body;
  console.log('isExistUserName.do data is ' + JSON.stringify(user));
  if (user.name === login.member0.phone || user.name === login.member1.phone || user.name === login.member2.phone || user.name === login.member3.phone
    || user.name === login.member4.phone || user.name === login.member5.phone || user.name === login.member6.phone || user.name === login.member7.phone
    || user.name === login.member8.phone || user.name === login.member9.phone) {
    res.json(duplicate.yes);
  } else {
    res.json(duplicate.no);
  }
})


// 更新订单状态的接口
apiRoutes.post('/product/show/ui/alterStatus.do',jsonParser,function(req,res){
  let user = req.body
  console.log('alterStatus.do data is ' + JSON.stringify(user))
  res.json(alterStatus)
})


// 获取购买商品列表
apiRoutes.post('/product/show/ui/getRecordList.do',jsonParser,function(req,res){
  let user = req.body
  console.log('getRecordList.do data is ' + JSON.stringify(user))
  if (user.userId === 101 || user.userId === 103 || user.userId === 105 || user.userId === 107 || user.userId === 109) {
    res.json(recordList)
  } else {
    res.json([])
  }
})

// 商品购买接口
apiRoutes.post('/product/show/ui/saveRecordList.do',jsonParser,function(req,res){
  let user = req.body
  console.log('saveRecordList.do data is ' + JSON.stringify(user))
  if (user.userId === 100|| user.userId === 102 || user.userId === 104 || user.userId === 106 || user.userId === 108) {
    res.json(saverecord.success)
  } else if(user.userId === 101|| user.userId === 103 || user.userId === 105) {
    res.json(saverecord.notexist)
  } else {
    res.json(saverecord.balance)
  }
})

/* setting router address */
app.use('/shop', apiRoutes)

const compiler = webpack(webpackConfig)

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
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
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
