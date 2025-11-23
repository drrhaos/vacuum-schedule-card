const path = require("path");

module.exports = {
  entry: "./src/vacuum-schedule-card.ts",
  output: {
    filename: "vacuum-schedule-card.js",
    path: path.resolve(__dirname, "."),
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
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

