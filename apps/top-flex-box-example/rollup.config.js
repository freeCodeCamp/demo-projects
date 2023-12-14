import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

export default {
  input: 'client/index.jsx',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    name: 'Client'
  },
  plugins: [
    resolve({ moduleDirectories: ['node_modules'] }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    commonjs({
      include: /node_modules/
    }),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
};
