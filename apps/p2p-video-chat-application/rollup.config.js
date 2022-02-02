import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: "src/client.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
    name: "Client",
  },
  plugins: [
    resolve({ moduleDirectories: ["node_modules", "../../node_modules"] }),
    nodePolyfills(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({ babelHelpers: "bundled" }),
  ],
};
