# Vite + Vue3 + TypeScript + Element Plus + Pinia 项目模板
技术栈：node.js + TypeScript + Vite + Vue 3 + Vue Router 4 + Axios + Pinia + Element Plus

node.js: 作者本人使用`18.19.0`。

pnpm: 作者本人使用`8.12.1`。

其他细节可见：[package.json](./package.json)

## 许可（License）
本项目使用[MIT LICENSE](./LICENSE)许可证发布。

MIT License: [mit-license.org](https://mit-license.org/)

## 配置文件
配置文件通常为`.env`开头的文件。例如开发模式会读取`.env.development`文件，生产模式会读取`.env.production`文件。
当然，读取文件的后缀是根据`pacckage.json`中的指令决定的。具体更详细的说明可见后文。

配置项如下：
```.env
VITE_HASH # 对于资源文件（例如图片）在build的时候，是否在文件名上添加哈希。具体作用见后文。
VITE_VISUALIZE # 是否在构建时生成构建分析报告（HTML交互式报告）。具体作用见后文。
VITE_API_BASE_URL # API请求前缀。具体作用见后文。
VITE_PROXY_TARGET # 代理目标。具体作用见后文。
```

### 读取配置文件的说明
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "build:beta": "vue-tsc && vite build --mode beta",
    "preview": "vite preview"
  }
}
```
在程序`dev`中，调用`vite`指令会读取`.env.development`文件，而程序`build`则会调用`vite build`指令且读取`.env.production`文件。
你也可以通过`--mode`参数指定需要读取的文件，例如`vite build --mode beta`会读取`.env.beta`文件。

### 资源文件名添加哈希的说明（VITE_HASH）
资源文件名添加哈希，可以保证每次项目重新构建时，资源文件名称不同，可以防止浏览器缓存问题（浏览器缓存旧版本的资源文件而不是使用新构建时的资源文件）。
在开发模式时建议设置为`false`，因为这样可以方便调试。在生产模式时建议设置为`true`，因为这样可以保证资源文件的唯一性。

### 构建时生成HTML交互式报告（VITE_VISUALIZE）
启用`visualizer` 构建时插件。改插件通常用于 JavaScript 应用的打包分析。它可以帮助开发者可视化地理解最终打包产物的结构、大小分布以及依赖关系。
他会在构建目录下生成报告的交互页面（例如：`./dist/report`），内部浏览完毕后建议删除该目录再上传到生产环境，当然你也可以保留以供你的用户浏览。

### API请求前缀（VITE_API_BASE_URL）
**该配置需要与后端同步（请见后文）**

**此处不考请求跨域问题，默认为不跨域**

例如你的API请求前缀为`https://api.example.com`，那么你可以在`.env`文件中设置`VITE_API_BASE_URL = https://api.example.com `。

当然，如果你的API的路径都具有一个固定的前缀（例如：`/api/v1`），那么你可以射中`VITE_API_BASE_URL = https://api.example.com/api/v1 `，
这样当系统请求`/user/info`的时候就会请求` https://api.example.com/api/v1/user/info `。

这样做还要一种好处，例如你后端简体的api是`/user/info`，正常来说前端应该请求` https://api.example.com/user/info `，其中`/user/info`会单独写在项目的`api`文件中，
并且和`VITE_API_BASE_URL`拼接生成最终请求地址（` https://api.example.com/user/info `）。
但是当你后端使用Nginx（或其他技术）做了反向代理，将`/api/v1`代理到了`/`，那么前端就应该请求` https://api.example.com/api/v1/user/info `，
此时只需要修改`VITE_API_BASE_URL`的值为（` https://api.example.com/api/v1 `）即可，而不需要修改项目中的`api`文件中的`user/info`。

#### 与后端同步配置
该配置在一般情况下应该与后端配置文件的`http.baseapi`保持一致。注意，`http.baseapi`的默认值是`/api`，当`http.baseapi`为空时也会使用默认值。

若使用了Nginx（或其他技术）的反向代理，则请确保`VITE_API_BASE_URL`的值与反向代理的值保持一致。即访问`VITE_API_BASE_URL`的值时，会被代理到后端的`http.baseapi`。

### 代理目标（VITE_PROXY_TARGET）
**仅用于测试环境**

开启后，将会将`/api`开头的请求转发到`VITE_PROXY_TARGET`上。
例如，请求`axios.get('/api/user/info')`则反向代理到`VITE_PROXY_TARGET + '/api/user/info'`上。

这么做的一个主要原因是解决跨域问题。前端在测试时通常是`localhost:8080`（端口号可能不同），后端可能则不在此地址上（尽管也可能在`localhost`上，但端口号不同，则仍然可能造成跨域）。
因此需要vite进行一个反向代理。

生产环境下不需要此功能，通常使用Nginx（或其他技术）解决问题，让后端和前端在一起，即同一个IP或域名，同一个端口号（例如常见的443和80）。

## 运行和构建
**下文使用npm为例，作者实际上使用的是pnpm。**

**当然，你可以尝试使用yarn，作者在此之前并未尝试过。**

运行前，你需要安装一些`node`模块。请执行：
```shell
npm install
```

### 运行
开发运行模式请执行（配置文件为`.env.development`，你应该对其进行修改为你的配置）：
```shell
npm run dev
```

你将在命令行看到服务启动的提示，以及监听地址。
访问监听地址，你就可以看到前端了。

通过此方式启动的开发运行模式具有热模块替换（HMR）、快速重新加载等特性，适合开发调试。

### 构建
对于生产环境构建，请执行（配置文件为`.env.production`，你应该对其进行修改为你的配置）：
```shell
npm run build
```

构建的结果将在`.\dist-production`下。

构建完成后，可以通过执行`preview`命令，来启动一个简易服务器（类似于Nginx）来部署构建结果：
```shell
npm run preview
```

这并不是开发运行模式，而是把经过上述方式构建生成的文件（`.\dist-production`）模拟生产环境进行预览。
在运行此命令之前，你应该先进行构建，并生成`.\dist-production`目录。

## 鸣谢
感谢Jetbrains AI Assistant（中国大陆版）为本项目提供了AI（人工智能）技术支持。

感谢Vite、Vue、Vue Router、Vuex、Axios、Element Plus等开源项目为本项目提供了技术支持。

感谢Github平台为本项目提供了代码托管服务。

特别鸣谢本项目所有贡献者和贡献团体对本项目的支持，你可以从PR记录、Commit记录中查看到他们的名字和贡献。
