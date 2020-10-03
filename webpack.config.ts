import { ConfigurationFactory } from 'webpack';
import * as CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserJSPlugin = require('terser-webpack-plugin');
import OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
import * as path from 'path';
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '.'),
  dist: path.join(__dirname, 'docs'),
}

function name(ext) {
  return `[name].${ext}?v=[contenthash:8]`
}

const config: ConfigurationFactory = (env, argv) => ({
  context: PATHS.src,
  entry: {
    style: './assets/scss/style.scss',
    main: './assets/js/main.ts'
  },
  output: {
    path: PATHS.dist,
    filename: `./assets/js/${name('js')}`
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: 'assets/pdf',
      to: 'assets/pdf'
    }]),
    new MiniCssExtractPlugin({
      filename: `./assets/css/${name('css')}`
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
              name: name('[ext]'),
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
          name: name('[ext]'),
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
  }
});

export default config;
