require('dotenv/config')
const http = require('http')
const path = require('path')
const R = require('ramda')
const express = require('express')
const cors = require('cors')
const serveStatic = require('serve-static')
const chalk = require('chalk')

const { DEBUG, PORT = 3000 } = process.env
const indexHtmlPath = path.join(__dirname, 'build/index.html')
const server = new http.Server()
const app = express()

const errorLog = R.pipe(
  R.prop('message'),
  chalk.red.underline,
  // eslint-disable-next-line no-console
  console.error
)

const log = R.pipe(
  chalk.bold.blue,
  // eslint-disable-next-line no-console
  console.log
)

server
  .listen({ port: PORT })
  .on('request', app)
  .on('listening', (err) => {
    if (err) {
      errorLog(err)
      process.exit(1)
    }

    log(`App listening on port ${PORT}`)
  })

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const createWebpackConfig = require('./webpack.config')

// TODO: Toggle HOT from envvar
const webpackConfig = createWebpackConfig({
  dev: true,
  hot: true,
  debug: DEBUG
})

const compiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  quiet: false,
  watchOptions: {
    ignored: /node_modules/
  }
})

app
  .get('/__invalidate', (req, res) => {
    devMiddleware.invalidate()
    res.end()
  })
  .use(devMiddleware)
  .use(webpackHotMiddleware(compiler))
  .get('*', (req, res) => {
    const file = devMiddleware.fileSystem.readFileSync(indexHtmlPath)
    res.send(file)
  })

