

文档：https://www.npmjs.com/package/uuid


# UUID

简单，快速生成RFC4122 UUIDS。


# 安装

npm i uuid


# 使用

uuid支持版本1,3,4和5 

require('uuid')不推荐使用。而是使用require('uuid/[v1|v3|v4|v5]')

然后生成你选择的uuid版本

## 版本1（时间戳）：

```
const uuidv1 = require('uuid/v1');
uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
```

## 版本4（随机）：

```
const uuidv4 = require('uuid/v4');
uuidv4(); // ⇨ '10ba038e-48da-487b-96e8-8d3b99b6d18a'
```


## 版本5（命名空间）：

```
const uuidv5 = require('uuid/v5');
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
uuidv5('Hello, World!', MY_NAMESPACE); // ⇨ '630eb68f-e0fa-5ecc-887a-7c7a62614681'
```