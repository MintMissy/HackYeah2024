// webpack.config.js

const path = require("path");

module.exports = {
	entry: {
		background: "./src/background.ts",
		content: "./src/content.ts",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
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
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	watch: true, // Enable watch mode
	watchOptions: {
		ignored: /node_modules/, // Ignore changes in node_modules
		aggregateTimeout: 300, // Delay the rebuild after the first change (optional)
		poll: 1000, // Polling interval in case file changes are not detected (optional)
	},
};
