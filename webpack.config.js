var path = require("path");
var src_dir = path.join(__dirname, "/client/src");

module.exports = {
  entry: `${src_dir}/index.jsx`,
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env', '@babel/preset-react']      // For tree-shaking
            [ 'es2015', { modules: false }]           // For tree-shaking
          }
        }
      }
    ]
  }
};