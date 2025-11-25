const path = require("path");

module.exports = {
  entry: "./src/vacuum-schedule-card.ts",
  output: {
    filename: "vacuum-schedule-card.js",
    path: path.resolve(__dirname, "dist"),
    module: true,
    library: {
      type: "module",
    },
    environment: {
      module: true,
    },
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: {
    "custom-card-helpers": "custom-card-helpers",
    lit: "lit",
  },
};
