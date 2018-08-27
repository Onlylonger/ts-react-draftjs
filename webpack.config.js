const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'dev'
const isProd = !isDev

const config = {
  entry: {
    'ts-react-draftjs': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    library: 'tsReactDraftjs',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}

if (isDev) {
  config.mode = 'development'
  config.devtool = 'eval-source-map'
  config.devServer = {
    contentBase: './dist'
  }
  config.plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, './index.html')
    })
  ]
} else if (isProd) {
  config.mode = 'production'
  config.devtool = 'source-map'
  config.externals = {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
  }
}

module.exports = config
