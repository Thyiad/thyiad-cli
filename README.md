# thyiad-cli

一键快速创建新项目😏

- 选择困难症救星
- 所有项目都可以直接run起来预览
    > 使用了自建的在线mock：https://easymock.thyiad.top

目前提供以下模板：
> 代码规范都基于 husky + eslint + prettier + pretty-quick + commitlint

### react项目
- react-antd、react-antd-ssr
    - 基于 webpack 从零配置的基础仓库
    - 分别是spa、ssr
    - react + typescript+react-router+antd+hooks（context+useReducer代替了redux）
    - 代码地址：[https://github.com/Thyiad/react-ssr](https://github.com/thyiad/react-ssr)
- react-vite-antd-spa、react-vite-zarm-spa
    - 基于 vite 的基础仓库
    - react + typescript + hooks（context+useReducer代替了redux）
    - antd和zarm分别适用pc、mobile
    - 基于vite的ssr暂未添加
    - 代码地址：https://gitee.com/Thyiad/pt-vite
- react-antd-pro-v4、react-antd-pro-v2
    - 基于ant design pro的基础仓库，不建议使用了
    - 分别对应 antd pro v4.0、v2.0
    - ts+react+react-router+redux+antd+hooks+umi+dva（v2.0没有hooks）
    - 代码地址：https://gitee.com/Thyiad/pt-react-antd-pro-v4

### vue项目
- vue3-vite-ele-spa
    - ts+vue3+vite+vuex+vue-router+element-plus
- vue3-vite-vant-spa
    - ts+vue3+vite+vuex+vue-router+vant
- vue-material
    - 基于vue cli 3.0
    - js+vue+vue-router+vuex+vue-material
    - 很喜欢 material 风格
- vue-element
    - 基于vue cli 2.0
    - js+vue+vue-router+vuex+element ui

### 组件/工具库
- react-ui-lib
    - rollup + typescript 开发自己的 react 组件库
    - 代码仓库：https://gitee.com/Thyiad/pt-ui-lib
- ts-lib
    - typescript 开发工具库
    - 不使用 webpack 等构建工具
    - 代码仓库：https://gitee.comThyiad/pt-ts-lib

### 后端项目
- gin-mongo
    - gin + mongodb + redis + jwt
    - 尚未全部完成
- koa-mongo
    - koa2 + typescript + mongodb + redis + jwt
- net-core-webapi
    - .net core 3.1 webapi

计划添加的：
- [ ] [fluentui](https://github.com/microsoft/fluentui)

### 使用

``` bash
npm install -g @thyiad/cli

thyiad-cli -c projectName
```

![](./preview.jpg)

> 当时为了下载速度，代码存放在gitee上，需要先配置好 gitee 的 ssh 才能正常下载
> 
> 如果出现代码下载失败，可以自行前往gitee.com下载，项目名均为pt-【name】，例如： https://gitee.com/Thyiad/pt-ui-lib
> 
> react-antd和react-ssr-antd在github上也有仓库，地址为 https://github.com/thyiad/react-ssr

### react-antd
![preview](https://gitee.com/Thyiad/react-ssr/raw/master/preview.jpg)

### react-ssr-antd
同 react-antd

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

### todo
- [ ] 添加到 npm init 模板
    > npm init @thyiad/app -> npx @thyiad/create-app
    > bin: { "create-app": "index.js" }
