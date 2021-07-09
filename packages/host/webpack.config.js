const HtmlWebpackPlugin = require("html-webpack-plugin");
const MedusaPlugin = require("@module-federation/dashboard-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: `auto`,
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
      // name: "host",
      // remotes: {
      //   app1: "app1@http://localhost:3002/remoteEntry.js",
      // },
      // shared: ["react", "react-dom"],
      name: "host",
      filename: "remoteEntry.js",
      library: { type: "var", name: "host" },
      remotes: {
        app1: "app1",
      },
      exposes: {
        "./App": "/src/App",
      },
      // sharing code based on the installed version, to allow for multiple vendors with different versions
      shared: require("./package.json").dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      excludeChunks: ["remoteEntry"],
    }),
    new MedusaPlugin({
      publishVersion: require("./package.json").version,
      filename: "dashboard.json",
      dashboardURL:
        "http://localhost:3050/api/update?token=29f387e1-a00d-46ea-9fd6-02ca5e97449c",
      versionChangeWebhook: "http://cnn.com/",
      metadata: {
        clientUrl: "http://localhost:3050",
        baseUrl: "http://localhost:3001",
        source: {
          url:
            "https://github.com/leonardosimoura/micro-frontends-study/tree/main/packages/host",
        },
        remote: "http://localhost:3001/remoteEntry.js",
      },
    }),
  ],
};