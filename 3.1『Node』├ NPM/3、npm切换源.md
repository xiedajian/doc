

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
npm config ls -l
```

