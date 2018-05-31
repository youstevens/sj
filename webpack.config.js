const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// webpack.config.js
module.exports = env => {
	return {
		mode: (!env.production)
			? 'development'
			: 'production',
		entry: {
			scripts: './src/js/scripts.js',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].min.js'
		},
		module: {
			rules: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['env']
						}
					}
				}, {
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader, {
							loader: 'css-loader'
						}, {
							loader: 'postcss-loader',
						}, {
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				}, {
					test: /\.(gif|png|jpe?g|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'images/',
							}
						}, {
							loader: 'image-webpack-loader',
							options: {
								bypassOnDebug: true
							}
						}
					]
				}
			]
		},
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true, parallel: true, sourceMap: true, // set to true if you want JS source maps
				}),
				new OptimizeCSSAssetsPlugin({}),
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "styles.min.css"
			}),
			new HtmlWebpackPlugin({
				// Generating the index.html based on the template
				template: './src/template/index.html',
				title: 'Swipe Jobs',
			}),
		],
		devServer: {
			contentBase: path.join(__dirname, "dist"),
			compress: true,
			port: 3000
		}
	};
};
