import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import ts from 'typescript'
import json from 'rollup-plugin-json'

const pkg = require('./package.json')

const libraryName = 'ts-react-draftjs'
const globalsLibrary = {
  react: 'React',
}
const externalLibray = ['react', 'react-dom']

export default {
  input: `src/index.tsx`,
  output: [
    {
      file: pkg.main,
      globals: globalsLibrary,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true
    },
    { file: pkg.module, globals: globalsLibrary, format: 'es', sourcemap: true }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: externalLibray,
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, typescript: ts, tsconfig: './tsconfig.json' }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/draft-js/lib/Draft.js': [
          'Editor',
          'EditorState',
          'KeyBindingUtil',
          'getDefaultKeyBinding',
          'RichUtils',
          'Modifier',
          'DefaultDraftBlockRenderMap',
          'convertToRaw',
          'convertFromHTML',
          'ContentState',
          'DraftHandleValue',
          'SelectionState',
          'DraftDragType',
          'DraftEditorCommand'
        ]
      }
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps()
  ]
}
