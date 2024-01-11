import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "./src/Autocomplete.jsx",
    external: ["react", "react-dom"],
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        exports: "named",
      },
    ],
    plugins: [
      postcss({
        extensions: [".css"],
      }),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
        presets: [
          [
            "@babel/preset-react",
            {
              pragma: "React.createElement",
              pragmaFrag: "React.Fragment",
            },
          ],
        ],
      }),
      commonjs(),
      external(),
      resolve(),
      terser(),
    ],
  },
];
