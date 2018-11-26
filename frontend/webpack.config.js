const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        path.join(__dirname, 'src', 'js', 'index')        
    ],    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            modules: path.join(__dirname, 'node_modules')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),        
    ],
    devServer: {
        contentBase: './dist',
        hot: true
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