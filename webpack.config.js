const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    devtools: `${__dirname}/src/devtools.js`,
    router: `${__dirname}/src/scripts/background/message-router.js`,
    ui: `${__dirname}/src/ui/index.js`,
    'mvproxy-content-script': `${__dirname}/src/scripts/content/mvproxy-content-script.js`
  },
  output: {
    path: `${__dirname}/dist/chrome`,
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'devtools.html',
      templateParameters: (compilation, assets, assetTags, options) => ({
        devtools: assets.chunks.devtools.entry
      }),
      // using .html as your template extention may unexpectedly trigger another loader.
      template: 'src/templates/devtools.html.ejs'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'panel.html',
      templateParameters: (compilation, assets, assetTags, options) => ({
        ui: assets.chunks.ui.entry
      }),
      template: 'src/templates/panel.html.ejs'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'manifest.json',
      templateParameters: (compilation, assets, assetTags, options) => {
        console.log('manifest assets: ', assets);
        return {
          content: assets.chunks['mvproxy-content-script'].entry,
          router: assets.chunks.router.entry
        };
      },
      template: 'src/templates/manifest.json.ejs'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'injector.js',
      template: 'src/templates/injector.js.ejs'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash:8].css' })
  ]
};
