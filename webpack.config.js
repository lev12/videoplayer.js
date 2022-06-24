const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const filename = (name ,ext) => {
    if (name != '')
    {
        if (isDev)
        {
            return `${name}.[contenthash].${ext}`;
        }
        else
        {
            return `${name}.${ext}`;
        }
    }
    else
    {
        if (isDev)
        {
            return `${name}.[contenthash].${ext}`;
        }
        else
        {
            return `${name}.${ext}`;
        }
    }
}

const plugins = () =>
{
    const basePlugins = [
        new MiniCssExtractPlugin({
            filename: "videoplayer.css"
        })
    ]
    
    if (isDev)
    {
        basePlugins.push(
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'index.html'),
            
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'sandbox/debug.html'),
            path: path.resolve(__dirname, 'dist/sandbox'),
            filename: `sandbox/debug.html`,
            scriptLoading: 'blocking',
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'sandbox/prototype.html'),
            path: path.resolve(__dirname, 'dist/sandbox'),
            filename: `sandbox/prototype.html`
        }))
    }
    return basePlugins;
}

module.exports = {
    mode: 'development',
    entry: {
        videoplayer: './src/js/index.ts'
    },
    devtool: 'inline-source-map',
    output: {
        filename: `${filename('videoplayer.bundle','js')}`,
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        //library: 'videoplayer',
        //libraryTarget: 'umd',
        //libraryExport: 'default',
        //globalObject: 'this'
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 4000,
    },
    plugins: plugins(),
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev
                    },
                },
                'css-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}