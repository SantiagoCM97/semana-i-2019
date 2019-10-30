const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = {
    entry: './src/assets/main.js',
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src/assets/')
  }
};