const path = require("path");

console.warn(__dirname);

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  devServer: {
    port: 9000,
    static: {
      serveIndex: true,
      directory: __dirname,
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(gltf)$/,
        use: [
          {
            loader: "gltf-webpack-loader",
          },
        ],
      },

      {
        test: /\.(bin)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
    ],
  },

  watchOptions: {
    ignored: /node_modules/,
  },
};
