const path = require('path');

module.exports = {
  entry: './arcanoid.ts',
    mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'arcanoid.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
