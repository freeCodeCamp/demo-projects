import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/client.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    name: 'Client'
  },
  plugins: [
    resolve({ moduleDirectories: ['node_modules'] }),
    commonjs({
      include: /node_modules/
    }),
    terser()
  ]
};
