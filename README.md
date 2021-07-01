# webpack5-webExp

使用 webpack5 搭建一个前端项目

# 1. 创建工程

## 1.1 运行`npm init -y` 创建工程

## 1.2.创建 `webpack.common.ts` `webpack.dev.ts` `webpack.prod.ts` 三个 webpack 配置文件

- `webpack.common.ts` 公共配置
- `webpack.dev.ts` 调试环境配置
- `webpack.prod.ts` 生产环境配置

## 1.3.`npm i webpack webpack-cli -D` 安装 webpack

## 1.4. `npm i webpack-merge webpack-dev-server -D` 安装 webpack 合并和调试工具

---

# 2.处理 html 资源

## 2.1 创建 `index.html`

```html
<!DOCTYPE html>
<html lang="cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack5</title>
  </head>
  <body>
    <div class="divRoot" id="root"></div>
  </body>
</html>
```

## 2.2 `npm i html-webpack-plugin -D` 安装 html 插件

```ts
// webpack.common.ts
import HtmlWebpackPlugin from "html-webpack-plugin";

plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
],
```

## 2.3 `npm i html-loader -D` 处理 html 里面的静态资源

```ts
// webpack.common.ts
module: {
  rules: [
    {
      test: /\.html$/i,
      // 处理html文件的img图片(负责引入img,从而能被url-loader进行处理)
      loader: "html-loader",
    },
  ];
}
```

# 3.处理 ts

## 3.1 安装 ts-loader `npm i ts-loader typescript -D`

```ts
 // webpack.common.ts
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
```

## 3.2 `tsc --init` 创建 **tsconfig.json**

## 3.3 创建 app.tsx 文件

```ts
import React, { useState } from "react";
import { Button } from "antd";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

function App() {
  const [count, setCount] = useState<number>(0);

  const onAdd = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div>count: {count}</div>
      <Button type="primary" onClick={onAdd}>
        加1
      </Button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

```

# 4. 处理 sass

## 4.1 安装 css-loader `npm install --save-dev style-loader css-loader`

## 4.2 安装 sass-loader `npm install --save-dev sass sass-loader `

## 4.3 安装 css 压缩抽离 `npm i mini-css-extract-plugin -D`

## 4.4 配置测试环境

```ts
// webpack.dev.ts

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
```

## 4.5 配置生产环境

```ts
//  webpack.prod.ts
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
```

## 4.6 创建 index.scss

```scss
// index.scss
$body-color: red;

* {
  margin: 0;
  padding: 0;
}
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-color: $body-color;
  background: no-repeat url("../img/1.jpg");
  .content {
    width: 600px;
    height: 600px;
    background-color: pink;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
```

# 5.拆分所有 chunks

```ts
// webpack.common.ts

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
```

# 6. 省略后缀名

```ts
// webpack.common.ts

    resolve: {
        // 配置省略文件路径的后缀名
        extensions: ['.tsx', '.ts', '.js'],
    }
```

# 7.处理静态资源

```ts
// webpack.common.ts

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/images/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/font/[hash][ext][query]'
                }
            },
```

# 8.测试环境配置 **devServer**

```ts
// webpack.dev.ts
    devServer: {
        contentBase: './dist',
        // 启动gzip 压缩
        compress: true,
        // 端口号
        port: 8080,
        open: true,
        hot: true,
    },
```

# 9.生产环境每次编译清除 dist 文件夹 ` npm i clean-webpack-plugin -D`

```ts
// webpack.prod.ts
import { CleanWebpackPlugin } from "clean-webpack-plugin";

    plugins: [
        new CleanWebpackPlugin(),
    ],
```

# 10.修改`package.json`

```
  "scripts": {
    "test": "webpack --config webpack.dev.js",
    "start": "webpack serve --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
```
