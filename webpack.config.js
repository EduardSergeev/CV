const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const path = require('path');

const PATHS = {
  src: path.join(__dirname, '.'),
  dist: path.join(__dirname, 'docs'),
  name: ext => `[name].${ext}?v=[contenthash:8]`
}

module.exports = (env, argv) => ({
  context: PATHS.src,
  entry: {
    style: './assets/scss/style.scss',
    main: './assets/js/main.ts'
  },
  output: {
    path: PATHS.dist,
    filename: `./assets/js/${PATHS.name('js')}`
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: 'assets/pdf',
      to: 'assets/pdf'
    }]),
    new MiniCssExtractPlugin({
      filename: `./assets/css/${PATHS.name('css')}`
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: false
    }),
  ].concat(argv.mode === 'production' ? [
    new PurgeCSSPlugin({
      paths: ['./index.html'],
      rejected: true,
      safelist: [
        'active', 'tag-h2', 'h2', 'h3',
        'nav-item', 'nav-link', 'collapsing'
      ],
    })] : []
  ),
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'ejs-loader'
      }, {
        loader: 'extract-loader'
      }, {
        loader: 'html-loader',
        options: {
          attributes: {
            list: [{
              tag: 'link',
              attribute: 'href',
              type: 'src',
            }]
          }
        }
      }]
    }, {
      test: /\.tsx?$/,
      use: 'ts-loader'
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    }, {
      test: /style\.scss$/,
      loaders: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: {
            loader: 'file-loader',
            options: {
              name: PATHS.name('[ext]'),
              outputPath: '/assets/images'
            }
          }
        }
      }]
    },
    {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: {
        limit: 8192,
        noquotes: true
      }
    },
    {
      test: argv.mode === 'production' ? /\.(jpg|png|gif|svg)$/ : /.^/,
      loader: 'image-webpack-loader',
      enforce: 'pre'
    },
    {
      test: /(manifest\.webmanifest)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: PATHS.name('[ext]'),
          outputPath: '.'
        }
      }, {
        loader: "app-manifest-loader"
      }]
    }, {
      test: /\.md$/,
      loaders: [
        'html-loader',
        'markdown-loader'
      ]
    }]
  },
  externals: {
    jquery: 'jQuery',
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserJSPlugin(),
      new OptimizeCssAssetsPlugin()
    ]
  },
  stats: 'detailed'
});
