const path = require('path');
const xEngine = require('@financial-times/x-engine/src/webpack');

const webpackConfigJs = () => {
  return {
    entry: {
      demo: ['./main.js', './demos/init-demo.js']
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx']
    },
    output: {
      path: path.resolve(__dirname, 'dist/demo'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: {
            loader: 'handlebars-loader',
            query: {
              extensions: '.html',
              helperDirs: [__dirname + '/node_modules/@financial-times'],
              debug: true
            }
          }
        },
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [xEngine()]
  };
};

module.exports = webpackConfigJs;
