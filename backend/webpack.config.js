const path = require('path')
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin')
const {
  version,
  name
} = require('./package.json')

module.exports = {
  entry: './sources/index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'builds'),
    filename: 'index.js'
  },
  externalsType: 'commonjs',
  externals: ['sqlite3'],
  mode: 'production',
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  plugins: [new GeneratePackageJsonPlugin({
    name,
    version,
    scripts: {
      start: 'node ./index.js'
    },
    dependencies: {
      sqlite3: ''
    },
    main: './index.js'
  })]
}
