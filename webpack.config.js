import path from "path";
const __dirname = path.resolve();
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin  from "mini-css-extract-plugin";
import TerserPlugin  from "terser-webpack-plugin";

let conf = {
    entry: ["@babel/polyfill",'./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
        
    },
    devServer: {
        hot: true,
        historyApiFallback: {
            disableDotRule: true    
        },
        port: 3000,
        static:path.resolve(__dirname,"dist"),
        watchFiles: ['src/**/*'],
    },
    resolve: {
        extensions: [".tsx",".jsx", ".ts", ".js", ".css", ".scss"]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"src/index.html"),
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x|.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                    ],
                    },
                },
            },
            {
                test:   /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
            },
               
        ]
    },
    stats: {
        children: true,
    },

};
export default (env, options) => {
    let isProd = options.mode === "production";
    conf.devtool = isProd ? false : "inline-source-map";
    if (isProd) {
        conf.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: /@extract/i
                }),
            ]
        };
    }
    conf.target = isProd ? "browserslist" : "web";
    return conf;
};