const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/app.ts'),
    output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		libraryTarget: 'umd',
		library: 'MyLib',
		umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
	},
	optimization: {
		minimize: false
	},
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
	},
	stats: {maxModules: Infinity, exclude: undefined}
};
