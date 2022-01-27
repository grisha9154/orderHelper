module.exports = {
  entry: "./index.ts",
  output: {
    filename: "./bundle.js",
    library: "OrderTraffic",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    fallback: {
      util: false,
      assert: false,
      https: false,
      http: false,
      tls: false,
      net: false,
      url: false,
      buffer: false,
      crypto: false,
      stream: false,
      zlib: false,
      querystring: false,
      os: false,
      path: false,
    },
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
  target: "node",
};
