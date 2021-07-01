import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";

export const common: Configuration = {
  entry: "./src/app.tsx",
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist"),
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  module: {
    rules: [
      {
        test: /\.html$/i,
        // 处理html文件的img图片(负责引入img,从而能被url-loader进行处理)
        loader: "html-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/font/[hash][ext][query]",
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    // 配置省略文件路径的后缀名
    extensions: [".tsx", ".ts", ".js"],
  },
};
