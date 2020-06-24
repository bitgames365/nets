# 跨域——Vue篇

[转自](https://juejin.im/post/5eeb73a46fb9a058882da529)

跨域，相信每一个前端开发人员都在项目中或多或少地碰到过。到底啥是跨域，又该如何解决，笔者根据自己开发Vue项目的经验进行了一些总结。

## 一、什么是跨域

跨域资源共享（CORS）是一种机制，用额外的http头告诉浏览器让运行在一个源（origin）/域（domain）上的web应用被允许访问来自不同源服务器上的指定资源。

当一个资源从与该资源本身所在的服务器**不同的域、协议或者端口**请求一个资源时，资源会发起一个**跨域http请求**。

以下三个dom标签允许跨域资源加载：

- `<img src>`
- `<link href>`
- `<script src>`

在请求资源时，**当协议头、域名、端口号中有任何一项不同时，**都会发生跨域资源请求。

## 二、Vue中的跨域解决方案

vue提供了较为简单的跨域解决方案，主要解决本地开发环境下的跨域以及部署到服务器上之后生产环境下的跨域。

### 1.前后端分离开发，后端统一打包前端静态资源

工程实践中常见的Vue + Spring Boot的框架进行前后端分离开发，在项目开发完成之后，后端将前端打包得到的静态资源放在`/static`文件夹下统一打成jar包或者war包放在服务器上。这种情况下前端解决跨域的方式如下：

在`Vue.config.js`文件下，修改`devServer`允许开发环境下的跨域：

```
module.exports = {
    devServer: {
        host: 'localhost',
        port: 4000,   // 本地前端启动端口
        proxy: {
          '/api': {
            target: 'http://localhost:9527/',   // 后端项目地址
            changeOrigin: true,  // 允许跨域
            pathRewrite: {
              '^/api': '/'
            }
          }
        }
    }
}
复制代码
```

在配置使用`Axios`时，应该如下配置：

```
import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_TARGET + 'api',
  timeout: 3000
}); 
复制代码
```

同时为生产环境和开发环境分别设置不同的请求地址：

- 开发环境下的.env.development文件：

```
NODE_ENV='development'

VUE_APP_TARGET = '/'
复制代码
```

- 生产环境下的.env.production文件：

```
NODE_ENV='production'

# 你的后端实际的API接口地址
VUE_APP_TARGET = 'https://giovanni.com:9527/'
复制代码
```

如此一来，在开发时，通过`Vue.config.js`允许跨域接口访问，在前端打包时，则根据生产环境选择了`Axios`的接口的实际地址，使得后续和Spring boot后端一起打包时，请求发出的地址与接口API的地址在同一个域下，自然就避免了跨域问题的产生。

### 2.前后端分离开发，在服务器上使用Nginx部署前端项目

这种情况下，使用`nginx`作反向代理，前端打包的静态资源并未与后端一同打包。需要在`nginx`的配置文件中进行跨域配置。

在`nginx.conf`文件中追加server：

```
server{
    # 前端项目端口
    listen  4000;  
    server_name  https://front.giovanni.com;
    
    location /{
        # vue打包之后静态文件夹位置
        root  /usr/local/vueProject/;   
        index  index.html
    }
    
    location /api{
        # 后端接口代理地址
        proxy_pass https://giovanni.com:9527/;
    }
}
复制代码
```

然后重启nginx，访问前端项目地址即可。

关注下面的标签，发现更多相似文章

[
  ](https://juejin.im/tag/Vue.js)


