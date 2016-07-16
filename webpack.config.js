module.exports = {
	entry: "./src/scripts/app.js",
	output: {
		path: "./app/scripts",
		filename: "app.bundle.js"
	},
devtool: "source-map",
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	}
}
