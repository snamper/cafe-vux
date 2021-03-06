// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
const ext = "http://"
const ip = ['127.0.0.1', '10.100.193.59', 'www.tianbakery.store']
const port = ['15080', '21080', '80']
const server = ext + ip[0] + ':' + port[0];
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 80,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/rest/shop': {
        target: server,
        changeOrigin: true,
        pathReWrite: {
          '^/rest/shop': ''
        }
      },
      '/shop': {
        target: server,
        changeOrigin: true,
        pathReWrite: {
          '^/shop': ''
        }
      },
      '/upload': {
        target: server,
        changeOrigin: true,
        pathReWrite: {
          '^/upload': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
