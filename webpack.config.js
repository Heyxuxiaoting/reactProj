const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html'
		}),
		// 热加载
		new webpack.HotModuleReplacementPlugin(),
		// 分离js和css，开发环境可以不配置，否则无法热加载css
		new ExtractTextWebpackPlugin('bundle.css')
	],
	module: {
		rules: [
			// 由于eslint-loader是用来检查代码规范的，应该在编译前执行，所以顺序应该在babel之前，安全起见，可以加上enforce参数
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
					}
				},
			},
			{
				test: /\.css$/,
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},{
						// 不使用less，直接用postcss css接受less sass语法
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')(),
								require('precss')(),
								require('postcss-flexbugs-fixes')()
							]
						}
					}]
				}),
				/* use: [{
					loader: 'style-loader'
				},{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
					}
				},{
					// 不使用less，直接用postcss css接受less sass语法
					loader: 'postcss-loader',
					options: {
						plugins: () => [
							require('autoprefixer')(),
							require('precss')(),
							require('postcss-flexbugs-fixes')()
						]
					}
				}] */
				// 使用less
				// use: ['style-loader','css-loader']
			},
			// {
			//     test: /\.less$/,
			//     // 注意引入顺序，否则引起错误
			//     use: ['style-loader','css-loader','less-loader']
			// }
			// 图片资源 如果limit设置较小，图片没有被解析成base64形式的话，需要安装file-loader
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 100
					}
				}]
			}
		]
	},
	/* 不用node方式
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        hot: true,
        port: 5000
    } */
};