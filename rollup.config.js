import path from 'path'

import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescriptPlugin from 'rollup-plugin-typescript2'
import typescript from 'typescript'
import packageJson from 'rollup-plugin-generate-package-json'

import pkg from './package.json'

const globalsLibrary = {
  react: 'React',
  'react-dom': 'ReactDOM'
}
const libraryName = 'tsReactDraftjs'

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${pkg.main}`,
      format: 'umd',
      name: libraryName,
      globals: globalsLibrary
    },
    {
      file: `dist/${pkg.module}`,
      format: 'es',
      name: libraryName,
      globals: globalsLibrary
    }
  ],
  external: ['react', 'react-dom']
  plugins: [
    commonjs(),
    typescriptPlugin({
      typescript,
      tsconfig: './tsconfig.json',
      clean: true,
      useTsconfigDeclarationDir: true
    }),
    resolve(),
    packageJson({
      inputFile: path.resolve(__dirname, './package.json'),
      outputFolder: path.resolve(__dirname, './dist'),
      baseContents: {
        name: pkg.name || '',
        version: pkg.version,
        description: pkg.description || '',
        main: pkg.main || '',
        module: pkg.module || '',
        keywords: pkg.keywords || [],
        homepage: pkg.homepage,
        author: pkg.author || '',
        license: pkg.license || 'MIT',
        repository: pkg.repository || '',
        dependencies: pkg.dependencies || {},
        peerDependencies: {
          react: '^0.14.0 || ^15.0.0-0 || ^16.0.0-0'
        },
        private: false
      }
    }),
    sizeSnapshot()
  ],
}

export default config
