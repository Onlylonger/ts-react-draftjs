const path = require('path')

const isDev = process.env.NODE_ENV === 'dev'

module.exports = {
  entry: './src/index.ts',
  devtool: isDev ? 'eval-source-map' : 'source-map',
  mode: isDev ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ts-react-draftjs.js',
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
  },
  externals: {
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
