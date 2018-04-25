'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')
const app = express()
// 跨域访问 false表示不跨域
const proxyType = false;

// body-parse define
const bodyParser = require('body-parser')
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/* define the data for ajax read */
const appData = require('../data.json')

/* define router  */
var apiRoutes = express.Router()
// 如果要改成跨域访问则可以改成其他值或者禁用express
app.use('/shop', apiRoutes)

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


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    // qingqiu
    before(app){
      if(!proxyType) {
        app.get('/shop/category/show/ui/getCategoriedProducts.do', function (req, res) {
          res.json(categorys)
        })

        // 修改会员信息接口
        app.post('/shop/member/show/ui/modifyBasicInfo.do', jsonParser, function(req, res){
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
        app.post('/shop/member/show/ui/modifyPassword.do', jsonParser, function(req, res){
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
        app.post('/shop/member/show/ui/memberLogin.do', jsonParser, function (req, res) {
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
        app.post('/shop/member/show/ui/createMember.do', jsonParser, function (req, res) {
          let user = req.body;
          console.log('createMember.do data is ' + JSON.stringify(user));
          if (user.name !== '18982278872') {
            res.json(register.success)
          } else {
            res.json(register.fail)
          }
        })

        // 是否用户名已存在
        app.post('/shop/member/show/ui/isExistUserName.do', jsonParser, function (req, res) {
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
        app.post('/shop/product/show/ui/alterStatus.do',jsonParser,function(req,res){
          let user = req.body
          console.log('alterStatus.do data is ' + JSON.stringify(user))
          res.json(alterStatus)
        })


        // 获取购买商品列表
        app.post('/shop/product/show/ui/getRecordList.do',jsonParser,function(req,res){
          let user = req.body
          console.log('getRecordList.do data is ' + JSON.stringify(user))
          if (user.userId === 101 || user.userId === 103 || user.userId === 105 || user.userId === 107 || user.userId === 109 ||
            user.userId === 102 || user.userId === 104 || user.userId === 106) {
            res.json(recordList)
          } else {
            res.json([])
          }
        })

        // 商品购买接口
        app.post('/shop/product/show/ui/saveRecordList.do',jsonParser,function(req,res){
          let user = req.body
          console.log('saveRecordList.do data is ' + JSON.stringify(user))
          if (user.userId === 100|| user.userId === 101 || user.userId === 102 || user.userId === 103 || user.userId === 104 ||
            user.userId === 105|| user.userId === 106 || user.userId === 107 || user.userId === 108) {
            res.json(saverecord.success)
          } else if(user.userId === 109) {
            res.json(saverecord.notexist)
          } else {
            res.json(saverecord.balance)
          }
        })       
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
