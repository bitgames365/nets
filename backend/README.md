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



