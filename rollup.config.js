import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.ts',
  plugins: [commonjs(), resolve(), sizeSnapshot()],
  output: {
    file: 'dist/bundle.js',
    sourceMap: true,
    format: 'umd',
    name: 'tsReactDraftjs'
  },
  external: ['react', 'react-dom']
}
