const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const optimization = () => {
  const config = {

  };
  if(isProd) {
      config.minimizer = [new OptimizeCssAssetsPlugin(), new terserWebpackPlugin()]
  }
  return config;
};
module.exports = {
    entry: {
        main: ['./src/js/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name][hash].js"
    },
    devServer: {
        port: 1337,
        hot: isDev
    },
    optimization: optimization(),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                }, 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    'file-loader?name=./images/[name].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    },
                    ]
            },
            {
                test: /\.(woff|woff2)/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
    ]
};