### 新建项目

1. 安装nestjs

   npm i -g @nestjs/cli

2. 新建任务

   nest new netserve

### 安装seagger

1. 安装OpenAPI

   npm install --save @nestjs/swagger swagger-ui-express 

   添加到main.ts里面

   ```typescript
   import { NestFactory } from '@nestjs/core';
   import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
   import { AppModule } from './app.module';
   
   async function bootstrap() {
     const app = await NestFactory.create(AppModule);
   
     const options = new DocumentBuilder()
       .setTitle('网络设备检查工具')
       .setDescription('提供网络设备检查工具接口，验证接口是否符合功能。')
       .setVersion('1.0')
       .addTag('Nets')
       .build();
     const document = SwaggerModule.createDocument(app, options);
     SwaggerModule.setup('api', app, document);
   
     await app.listen(3000);
   }
   bootstrap();
   ```

### 安装登录验证模块

1. 安装passport模块

   安装模块的local校验过程要记住，如果super没有改字段的话，按照默认字段来，dto里面的字段必须和默认的一致，username和password。

   ```bash
   $ npm install --save @nestjs/passport passport passport-local
   $ npm install --save-dev @types/passport-local
   $ npm install @nestjs/jwt
   $ npm i passport-jwt
   ```

2. nest上面的例子拷贝过来

3. 测试

   postman输入：

   POST localhost:3000/auth/login

   选择：raw   TEXT 改成 JSON

   {"username": "john", "password": "changeme"}

   返回

   {

     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU5MjU1MDMzMywiZXhwIjoxNTkyNTUwMzkzfQ.mX_YbKAZDHmnZdaIWOVcYlCnQr15BUMYAk2YMQmb-Ys"

   }

   ![image-20200619153620635](https://github.com/bitgames365/nets/blob/master/backend/image-20200619153620635.png)

4. 登录的时候记得带上token

   ![image-20200619153458368](https://github.com/bitgames365/nets/blob/master/backend/image-20200619153458368.png)

5. 登录验证模块基本完成

### TypeOrm的集成

[官网手册](https://typeorm.io/#/)

```typescript
 npm install --save @nestjs/typeorm typeorm mysql
```



### nestjs验证管道

npm i --save class-validator class-transformer

[解决循环依赖](https://blog.csdn.net/weixin_43902189/article/details/100516130)

---

## 2020/06/23

提交版本：31c407b7957215b3dd4b349444311ed212d010b7

### 增加crud

参考[数据库操作及crud](https://www.techiediaries.com/nestjs-tutorial-rest-api-crud/)

参考[官网](https://docs.nestjs.cn/6/recipes?id=crud)

---

## 2020/06/24

### 解决跨域是问题

刚开始用前端解决，它的原理好像说是启动一个代理服务，端口和后台服务一样，通过代理跳转，结果后台和前端都在同一台机器上，没办法起同端口的代理服务，折腾了好久。。。。

直接在main.ts里面加

app.enableCors(); 实现后端跨域。

permission.js

用router.beforeEach实现路由控制：

1. 页面白名单

   设置一个白名单数组，白名单里面放路由，如果是白名单里面的路由，则不需要access_token就可以访问

2. 访问前登录

   某些页面是需要登录才能访问的，所以我们在不是白名单的的路由范围的时候判断一下有没有token如有，则放行，如果没有跳转到登录页面去登录。登录之后再跳转。

### 前端登录

原来的登录方法

```typescript
// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)
```

由于我们用了bearer的方式，是在head请求里加了Authorization 稍微改一下，成了这样：

```typescript
// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    const bearerToken = 'Bearer ' + token
    config.headers['Authorization'] = bearerToken
  }
  return config
}, errorHandler)
```

记住vue中的两种数据存储方式：

* storage基于html5借助于浏览器storage local的存储方式
* store方式 store.getters.name 

```typescript
// 获取用户信息
GetInfo ({ commit }) {
    return new Promise((resolve, reject) => {
        getInfo().then(response => {
            storage.set(ACCESS_NAME, response.name, 7 * 24 * 60 * 60 * 1000)
            commit('SET_NAME', { name: response.name, welcome: welcome() })
            commit('SET_AVATAR', response.avatar)
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
},
commit('SET_TOKEN', '')
commit('SET_ROLES', [])
storage.remove(ACCESS_TOKEN)
storage.remove(ACCESS_NAME)
```





