const HtmlWebpackPlugin = require("html-webpack-plugin");
const MedusaPlugin = require("@module-federation/dashboard-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3003,
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: "auto",
    uniqueName: `app2.${require("./package.json").version}`,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  cache: false,
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2__REMOTE_VERSION__",
      library: { type: "var", name: "app2__REMOTE_VERSION__" },
      filename: "remoteEntry.js",
      exposes: {
        "./App2": "./src/App2",
        reactVersion: "react",
        reactDomVersion: "react-dom",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MedusaPlugin({
      publishVersion: require("./package.json").version,
      filename: "dashboard.json",
      dashboardURL:
        "http://localhost:3050/api/update?token=29f387e1-a00d-46ea-9fd6-02ca5e97449c",
      metadata: {
        baseUrl: "http://localhost:3003",
        source: {
          url:
            "https://github.com/leonardosimoura/micro-frontends-study/tree/main/packages/app2",
        },
        remote: "http://localhost:3003/remoteEntry.js",
      },
    }),
  ],
};
