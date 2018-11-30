const path = require('path')
const webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'src', 'js', 'index')        
    ],    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'     
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            modules: path.resolve(__dirname, 'node_modules')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),  
        new webpack.NamedModulesPlugin(),  
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })    
    ],
    devServer: {
        contentBase: 'public',               
    },
    module: {        
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /src/,
                use:{
                    loader: 'standard-loader'
                } 
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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