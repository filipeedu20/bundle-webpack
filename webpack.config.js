const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack'); 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //minifica arquivos 

module.exports = {
        entry: path.join(__dirname, 'src/index.jsx'),
        output: { path: path.join(__dirname, 'dist'), 
        filename: 'bundle.js'
    },

    plugins: [ 
        new HtmlWebpackPlugin({
             filename: 'index.html',
             template: path.join(__dirname, 'src/index.html') 
            }),
        new ExtractTextPlugin('style.css'),
        new UglifyJSPlugin()
    ],
    


    

     // propriedades entry e output omitidas 
    resolve: { 
        extensions: [".js", ".jsx"] },
        module: { 
            rules: [ 
                {
                    test: /.jsx?$/, 
                    exclude: /node_modules/, 
                    include: path.join(__dirname, 'src'),
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react'] 
                    }
                }]
            },
            {
                test: /\.(jpe?g|ico|png|gif|svg)$/i,
                loader: 'file-loader?name=img/[name].[ext]'
            },
            { 
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use: "css-loader"
                })
            }

        ] 
    }, 


     devServer: { publicPath: "/", contentBase: "./dist" },
     
     plugins: [ new HtmlWebpackPlugin({ filename: 'index.html', template: path.join(__dirname, 'src/index.html') }) ],
     
};