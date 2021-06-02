const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader","css-loader", 
        {
          loader: "sass-loader",
          options: {
            // Prefer `dart-sass`
            implementation: require("sass"),
          }}]
      },

      {
        test: /\.(png|jpg)$/,
        use: ["url-loader"]
      },
      {
        test: /\.(woff2?)$/,
        use: ["file-loader"]
      },
    ]
  },
  resolve: { 
    alias: {assets: path.resolve(__dirname, 'src/Images')},
    extensions: ["*", ".js", ".jsx",] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
    proxy: {
      '/categories': 'http://localhost:3001',
      '/product': 'http://localhost:3001',
      '/rest': 'http://localhost:3001'
    },
    watchOptions: {
      poll: true,
      aggregateTimeout: 2000
    }
  },
 
};