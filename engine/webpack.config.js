const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/playground.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'playground.js',
        library: 'playground',
        libraryTarget: 'umd'
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