var webpackConfig = require('./webpack.config.js');
var Webpack = require('webpack');
var _ = require('lodash');

module.exports = _.assign({}, webpackConfig, {
    output: {
        filename: 'bundle.min.js'
    },
    devtool: null,
    plugins: [
        new Webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        })
    ]
});