import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { common } from "./webpack.common";

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    // 启动gzip 压缩
    compress: true,
    // 端口号
    port: 8080,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
} as Configuration);
