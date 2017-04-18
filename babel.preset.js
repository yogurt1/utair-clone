const reactPreset = require('babel-preset-react')
const envPreset = require('babel-preset-env')
const syntaxDynamicImport = require('babel-plugin-syntax-dynamic-import')
const transformClassProperties = require('babel-plugin-transform-class-properties')
const transformDecoratorsLegacy = require('babel-plugin-transform-decorators-legacy').default
const transformObjectRestSpread = require('babel-plugin-transform-object-rest-spread')
const reactHotLoader = require('react-hot-loader/babel')

const buildTargets = (opts) => {
  const targets = {
    chrome: 56
    // firefox: 52
  }

  if (opts.supportShit) {
    Object.assign(targets, {
      safari: 10
    })
  }

  return targets
}

const buildPreset = (ctx, opts) => {
  const targets = buildTargets(opts)

  const presets = [
    [envPreset, {
      targets,
      modules: false,
      debug: true,
      useBuiltIns: true,
      exclude: [
        'transform-async-to-generator',
        'transform-regenerator'
      ]
    }],
    reactPreset
  ]

  const plugins = [
    syntaxDynamicImport,
    transformDecoratorsLegacy,
    transformClassProperties,
    transformObjectRestSpread
  ]

  if (opts.hot) {
    plugins.push(reactHotLoader)
  }

  return { presets, plugins }
}

module.exports = {
  __esModule: true,
  default: buildPreset
}
