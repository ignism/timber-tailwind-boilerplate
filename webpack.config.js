const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (env, options) => {
  console.log('env: ')
  console.log(env)
  console.log('options: ')
  console.log(options)

  return ({
    entry: { 
      bundle: './src/index.js' 
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    purgecss: options.mode === 'production' ? { content: ['./**/*.twig'] } : false,
                    cssnano: options.mode === 'production' ? {} : false
                  }
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new CleanWebpackPlugin('dist')
    ]
  })
}