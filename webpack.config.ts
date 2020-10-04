import { ConfigurationFactory } from "webpack";
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as TerserJSPlugin from 'terser-webpack-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as path from 'path';

const name = ({ name = '[name]', ext = '[ext]' } = {}) =>
  `${name}.${ext}?v=[contenthash:8]`;


const config: ConfigurationFactory = (env, argv) => ({
  context: __dirname,
  entry: './assets/ts/main.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `assets/js/${name({ ext: 'js' })}`,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: 'assets/pdf',
      to: 'assets/pdf'
    }]),
    new CopyWebpackPlugin([{
      from: 'CNAME',
      to: '.'
    }]),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
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
            }, {
              tag: 'script',
              attribute: 'src',
              type: 'src',
            }]
          }
        }
      }]
    }, {
      test: /\.tsx?$/,
      use: 'ts-loader',
    }, {
      test: /style\.scss$/,
      loaders: [{
        loader: 'file-loader',
        options: {
          name: name({ ext: 'css' }),
          outputPath: 'assets/css'
        }
      },
        'extract-loader',
        'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: {
              '@fullhuman/postcss-purgecss': {
                content: ['index.html'],
                safelist: [
                  'active', 'tag-h2', 'h2', 'h3',
                  'nav-item', 'nav-link', 'collapsing'
                ]
              }
            }
          }
        }
      },
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
              name,
              outputPath: '/assets/images'
            }
          }
        }
      }]
    }, {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: {
        limit: 8192,
        noquotes: true
      }
    }, {
      test: argv.mode === 'production' ? /\.(jpg|png|gif|svg)$/ : /.^/,
      loader: 'image-webpack-loader',
      enforce: 'pre'
    }, {
      test: /(manifest\.webmanifest)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name
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
      new TerserJSPlugin(),
      new OptimizeCssAssetsPlugin()
    ]
  }
});

export default config;
