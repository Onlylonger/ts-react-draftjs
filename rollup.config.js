import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
      clean: true
    }),
    resolve(),
    sizeSnapshot()
  ],
  output: {
    file: 'dist/bundle.js',
    sourceMap: true,
    format: 'umd',
    name: 'tsReactDraftjs'
  },
  external: ['react', 'react-dom']
}
