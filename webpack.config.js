const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const WebpackNotifier = require('webpack-notifier')
const babelPreset = require('./babel.preset')

const babelRule = (opts) => {
  // TODO: ESLint loader
  return {
    test: /\.jsx?/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [babelPreset, opts]
          ]
        }
      }
    ]
  }
}

const staticRule = () => {
  return {
    test: /\.(jpe?g|png|woff2?|ttf|eot|svg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ]
  }
}

const isProduction = process.env.NODE_ENV === 'production'

module.exports = ({
  hot = !isProduction,
  prod = isProduction,
  debug = true
} = {}) => {
  const opts = { hot, prod, debug }

  const plugins = [
    new HtmlPlugin({
      template: './app/index.html',
      opts
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: debug
    }),
    new ServiceWorkerPlugin({
      entry: './app/service-worker.js',
      filename: 'sevice-worker.js'
    }),
    new WebpackNotifier({
      alwaysNotify: true
    })
  ]

  const config = {
    plugins,
    devtool: prod ? 'source-map' : 'inline-source-map',
    entry: {
      app: [
        './app/index.jsx'
      ]
    },
    module: {
      rules: [
        babelRule(opts),
        staticRule(opts)
      ]
    },
    output: {
      path: path.resolve('./build'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
      alias: {
        app: path.resolve('./app')
      }
    }
  }

  if (hot) {
    config.entry.app.unshift('webpack-hot-middleware/client')
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    )
  }

  return config
}
