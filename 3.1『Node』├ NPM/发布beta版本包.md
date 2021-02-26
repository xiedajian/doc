
# 在NPM上发布beta或alpha版

大多数软件在发布之前都有beta版 — 该版本包含某些还处于试验阶段的功能，尚未达到生产就绪状态。

常常会有一些beta测试用户群体，他们使用该版本，对其进行测试，提交bug和其他发现的问题。

开发NPM module也有相同的过程。那么我们如何通过NPM部署beta版本呢？


1.改变package.json 中的 version
```
"version": "1.0.1-beta",
```

2.发布时携带 --tag
```
npm publish --tag=beta
```

3.安装发布的版本
```
npm install name@beta
```


# beta版在升级

在你的版本末尾添加 beta.0 非常重要。
.0 表示它是哪个版本。
当我们对 beta 版进行修补发布新的 beta 版本时，我们会将 .0 递增到 .1，以此类推。


1.改变package.json 中的 version
```
"version": "1.0.1-beta.2",
```

2.发布时携带 --tag
```
npm publish --tag=beta
```

3.安装发布的版本
```
npm install name@beta
```





