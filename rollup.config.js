import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'


const plugins = [
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**'
  }),
  commonjs(),
  resolve(),
  postcss({
    modules: {
      globalModulePaths: [
        /global/
      ]
    },
    autoModules: false,
    plugins: [
      autoprefixer({ grid: true }),
      cssnano({ preset: 'default' })
    ]
  })
]

if(process.env.BUNDLE_VERSION === 'production') plugins.push(terser())

export default {
  input: 'src/index.js',
  external:[],
  output: {
    file: 'dist/retool-plugin-speech2text.min.js',
    format: 'iife',
    name: 'RetoolPluginSpeech2Text',
    sourcemap: false,
    globals: {
    }
  },
  watch: {
    exclude: 'dist/*',
    include: 'src/**'
  },
  plugins
}
