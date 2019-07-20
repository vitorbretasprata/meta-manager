const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv').config({path: __dirname + '/.env'});

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: 'cheap-module-source-map',    
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            modules: path.resolve(__dirname, 'node_modules')
        }
    },
    node: {
        net: 'empty',
        dns: 'empty'
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed)
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    devServer: {
        contentBase: './',
        historyApiFallback: true
    },
    module: {        
        rules: [           
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },            
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /src/,
                use:{
                    loader: 'babel-loader'
                }            
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    },
                  },
                ],
            }
        ]
    }
}