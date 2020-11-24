const path = require('path');

module.exports = {
  entry: './background/background.ts',
  mode: 'development',
  devtool: "inline-source-map",
  target: 'web',
  output: {
    publicPath: "/background/",
    filename: 'background.bundled.js',
    path: path.resolve(__dirname, 'background/'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.worker\.ts$/,
        use: { loader: "worker-loader" },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: false
  },
};
