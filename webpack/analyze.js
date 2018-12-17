const webpack = require('webpack')
const configuration = require('./build-config.js')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
configuration.plugins.push(new BundleAnalyzerPlugin())
module.exports = configuration
