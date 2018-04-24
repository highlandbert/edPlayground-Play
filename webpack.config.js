const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
     resolve: {
        extensions: ['.js'],
    },
    mode: 'none',
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: "/dist/",
        watchContentBase: true
    }
}