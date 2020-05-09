

## cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```


# 临时使用淘宝源
```
npm install --registry=https://registry.npm.taobao.org
npm install jquery --registry https://registry.npm.taobao.org
```

# 全局切换 npm 使用淘宝源

全局配置切换到淘宝源

```
 npm config set registry https://registry.npm.taobao.org
```

全局配置切换到官方源
```
 npm config set registry https://registry.npmjs.org
```

检测是否切换到了淘宝源
```
npm info underscore
```

```
...
gitHead: 'e4743ab712b8ab42ad4ccb48b155034d02394e4d',
  dist: 
   { shasum: '4f3fb53b106e6097fcf9cb4109f2a5e9bdfa5022',
     size: 34172,
     noattachment: false,
    //　有　registry.npm.taobao.org　等字样　　说明切换成功
     tarball: 'http://registry.npm.taobao.org/underscore/download/underscore-1.8.3.tgz' },
  directories: {},
  publish_time: 1427988774520 }

```
