# thyiad-cli

一键快速创建新项目😏

目前提供以下模板：

- ts-lib
    > ts开发npm包
- vite-antd
    > react+useReducer+antd，基于vite的ssr暂未添加
- vite-zarm
    > react+useReducer+zarm，基于vite的ssr暂未添加
- react-antd
    > 从零配置的ts+react+react-router+antd+hooks（context+useReducer代替了redux）
- react-ssr-antd
    > 同上，多了server端，支持ssr
- react-antd-pro-v4
    > 基于ant design pro 4.0：ts+react+react-router+redux+antd+hooks+umi+dva
- react-antd-pro-v2
    > 基于ant design pro 2.0：js+react+react-router+redux+antd+umi+dva
- vue-material
    > 基于vue cli 3.0：js+vue+vue-router+vuex+vue-material
- vue-element
    > 基于vue cli 2.0: js+vue+vue-router+vuex+element ui
- koa-mongo
    > koa2+mongodb+jwt
- net-core-webapi
    > .net core 3.1 webapi

计划添加的：
- [ ] [fluentui](https://github.com/microsoft/fluentui)

### 使用

``` bash
npm install -g @thyiad/cli

thyiad-cli -c projectName
```

![](./preview.jpg)

> 如果出现代码下载失败，可以自行前往gitee.com下载，react-antd和react-ssr-antd在github上的地址为 https://github.com/thyiad/react-ssr ，其他的项目名均为pt-【name】
> 当时为了下载速度，代码存放在gitee上，后面再迁移到github吧

### react-antd
![preview](https://gitee.com/Thyiad/react-ssr/raw/master/preview.jpg)

### react-ssr-antd
同 react-ant

### react-antd-pro-v4
![preview](https://gitee.com/Thyiad/pt-react-antd-pro-v4/raw/master/preview.jpg)

### react-antd-pro-v2
同 react-antd-pro-v4

### vue-material
![](https://gitee.com/Thyiad/pt-vue-material/raw/master/preview-login.jpg)
![](https://gitee.com/Thyiad/pt-vue-material/raw/master/preview.jpg)

### vue-element
![login](https://gitee.com/Thyiad/pt-vue-element/raw/master/preview-login.jpg)
![preview](https://gitee.com/Thyiad/pt-vue-element/raw/master/preview.jpg)
