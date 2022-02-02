import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
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
    commonjs({
      include: /node_modules/,
    }),
  ],
};
