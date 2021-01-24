const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ttf|woff|eot)/,
        loader: "file-loader",
        options: {
          outputPath: "fonts",
        },
      },
      {
        test: /\.(png|jpg)$/,
        loader: "file-loader",
        options: {
          outputPath: "imgs",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
  ],
};
