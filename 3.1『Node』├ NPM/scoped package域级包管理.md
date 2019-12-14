[scoped package](https://docs.npmjs.com/misc/scope#publishing-public-scoped-packages-to-the-public-npm-registry)
[参考](https://juejin.im/post/5d08d3d3f265da1b7e103a4d#heading-39)

# scoped package 域级包

在package.json中的依赖有两种形式：
```
"devDependencies": {
  "@commitlint/cli": "^7.2.1",
  "commitizen": "^3.0.4"
}
```


其中以@开头的包名，是一个域级包（scoped package），

这种域级包的作用是将一些packages集中在一个命名空间下，

一方面可以集中管理，一方面可以防止与别的包产生命名冲突。

要发布域级包，首先要在项目的package.json的name属性中添加scope相关的声明，可以通过指令添加：

```
npm init --scope=scopeName -y
```

package.json变为：
```
{
  "name": "@scopeName/package"
}
```
> 可以将用户名作为域名，也可以将组织名作为域名。


由于用@声明了该包，npm会默认将此包认定为私有包，而在npm上托管私有包是需要收费的，
所以为了避免发布私有包，可以在发布时添加--accss=public参数告知npm这不是一个私有包：
```
npm publish --access=public
```

> 域级包不一定就是私有包，但是私有包一定是一个域级包。


同时，在安装域级包时需要按照域级包全名来安装：
```
npm install @scopeName/package
```
