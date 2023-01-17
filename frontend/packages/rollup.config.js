import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      // babel({
      //   exclude: "node_modules/**",
      //   babelHelpers: "bundled",
      // }),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: [
      "@emotion/server",
      "@emotion/cache",
      "@emotion/react",
      "@emotion/styled",
      "@mui/material",
      "@mui/x-data-grid",
      "lodash",
      "react",
      "react-hook-form",
      "react-dom",
      "next",
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
