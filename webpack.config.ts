import { ConfigurationFactory } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as HtmlWebpackProcessingPlugin from 'html-webpack-processing-plugin';
import * as TerserJSPlugin from 'terser-webpack-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as path from 'path';
import * as cheerio from 'cheerio';


const name = ({name = '[name]', ext = '[ext]'} = {}) =>
  `${name}.${ext}?v=[contenthash:8]`;

const config: ConfigurationFactory = (_env, argv) => ({
  context: __dirname,
  entry: './assets/ts/main.ts',
  output: { 
    path: path.join(__dirname, 'dist'),
    filename: `assets/js/${name({ext: 'js'})}`,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: 'CNAME',
      to: '.'
    }]),
    new HtmlWebpackPlugin({
      template: './index.html',
      preProcessing: (html: string) => {
        const $ = cheerio.load(html);
        $('h2,h3,h4').each((_, tag) => {
          const id = $(tag).attr('id');
          const name = $(tag).prop('name');
          $('nav ul').append(`
            <li class="nav-item tag-${name}">
              <a class="nav-link" href="#${id}" onclick="return navigate('#${id}')">
                ${$(tag).text()}
              </a>
            </li>`);
        });
        return $.html();
      }
    }),
    new HtmlWebpackProcessingPlugin()
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
                  'active', 'tag-h2', 'tag-h4', 'h2', 'h3',
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
