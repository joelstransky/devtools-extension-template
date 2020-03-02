import HtmlWebpackPlugin from 'html-webpack-plugin';
import PnpWebpackPlugin from `pnp-webpack-plugin`;
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';

module.exports = {
  mode: 'development',
  entry: {
    devtools: `${__dirname}/src/devtools.js`,
    router: `${__dirname}/src/scripts/background/message-router.js`,
    ui: `${__dirname}/src/ui/index.js`,
    'mvproxy-content-script': `${__dirname}/src/scripts/content/mvproxy-content-script.ts`
  },
  output: {
    path: `${__dirname}/dist/chrome`,
    filename: '[name].[chunkhash:8].js'
  },
  resolve: {
    plugins: [PnpWebpackPlugin]
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: require.resolve('ts-loader') },
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
          loader: require.resolve('babel-loader'),
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
