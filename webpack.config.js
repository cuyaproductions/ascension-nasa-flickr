module.exports = {
	entry: "./src/scripts/app.js",
	output: {
		path: "./app/scripts",
		filename: "app.bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	}
}
