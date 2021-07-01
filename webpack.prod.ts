import { merge } from "webpack-merge";
import { common } from "./webpack.common";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../",
            },
          },
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
});
