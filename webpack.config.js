var webpack = require("webpack");
var path = require('path');

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

var config = {
	entry: "./index.js",
	output: {
		path: DIST_DIR + "/app",
		filename: "bundle.js",
		publicPath: "/app/"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['react', 'es2015']
						}
					}
				]
			}
		]
	},
	plugins: [
	]
};

module.exports = config