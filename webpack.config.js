const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: 'cheap-module-source-map',  
    output: {
        publicPath: '/'
    },    
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
        })    
    ],
    devServer: {
        contentBase: 'public'
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
        }]
    }
}