var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var node_modules = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    "index": './client/src/index.js',
    "home": './client/src/home.js',
    "vendors": ['bootstrap.css', 'react', 'react-dom', 'font-awesome.css']
  },
  output: {
    path: __dirname + '/public/',
    filename: '[chunkhash:8].[name].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!less-loader"})
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=10000&name=build/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom'
    }),
    new ExtractTextPlugin("[chunkhash:8].[name].css"),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: '[chunkhash:8].vendors.js'}),

  ],
  performance: {
    hints: false
  },
  resolve: {
    alias: {
      'font-awesome.css': 'font-awesome/css/font-awesome.min.css',
      'bootstrap.css': 'bootstrap/dist/css/bootstrap.min.css'
    }
  }
};

function htmlwebpackPluginBuilder(fileName, deps) {
  return new HtmlWebpackPlugin({
    filename: fileName,
    minify: {collapseWhitespace: true},
    template: __dirname + '/client/' + fileName,
    inject: true,
    chunks: deps
  })
}

config.plugins.push(htmlwebpackPluginBuilder('index.html', ['vendors', 'index']));
config.plugins.push(htmlwebpackPluginBuilder('home.html', ['home.css', 'vendors', 'home']));

module.exports = config;