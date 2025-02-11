const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: './src/index.ts',
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
		mainFields: ["module", "main"],
		// conditionNames: ['import', 'browser'],
		// fallback: {
		// 	assert: require.resolve('assert'),
		// 	buffer: require.resolve('buffer'),
		// 	fs: require.resolve('browserify-fs'),
		// 	path: require.resolve('path-browserify'),
		// 	stream: require.resolve('stream-browserify'),
		// 	util: require.resolve('util'),
		// 	process: require.resolve('process/browser'),
		// 	zlib: require.resolve('browserify-zlib'),
    //   tty: require.resolve("tty-browserify")
		// }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()]
};

