const HtmlWebpackPlugin = require('html-webpack-plugin');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    devtools: `${__dirname}/src/devtools.ts`,
    router: `${__dirname}/src/scripts/background/message-router.ts`,
    ui: `${__dirname}/src/ui/index.tsx`,
    'mvproxy-content-script': `${__dirname}/src/scripts/content/mvproxy-content-script.ts`
  },
  output: {
    path: `${__dirname}/dist/chrome`,
    filename: '[name].[chunkhash:8].js'
  },
  resolve: {
    plugins: [PnpWebpackPlugin],
    extensions: ['.tsx', '.ts', '.js']
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  // @TODO fix this mess
  // externals: [
  //   // react: 'React',
  //   // 'react-dom': 'ReactDOM'
  //   function(context, request, callback) {
  //     if (/^.*\/ui$/.test(context)) {
  //       // console.log('EXTERNALS::', context, request, callback);
  //       return callback(null, 'react react-dom ' + request);
  //     }
  //     callback();
  //   }
  // ],
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
    new CopyPlugin([{ from: 'src/assets', to: 'assets' }]),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash:8].css' })
  ]
};
