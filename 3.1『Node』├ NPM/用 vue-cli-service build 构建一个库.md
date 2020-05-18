
[vue-cli-service 构建库](https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93)


# vue-cli-service

当你运行 vue-cli-service build 时，你可以通过 --target 选项指定不同的构建目标。它允许你将相同的源代码根据不同的用例生成不同的构建。

# --target lib 构建库

--target lib 表示构建的是一个 umd 库

> 在库模式中，Vue 是外置的。这意味着包中不会有 Vue，即便你在代码中导入了 Vue。

执行命令：
```
vue-cli-service build --target lib --name myLib [entry]
```

build 结果：
```
File                     Size                     Gzipped

dist/myLib.umd.min.js    13.28 kb                 8.42 kb
dist/myLib.umd.js        20.95 kb                 10.22 kb
dist/myLib.common.js     20.57 kb                 10.09 kb
dist/myLib.css           0.33 kb                  0.23 kb
```

- --target: 构建目标，默认为应用模式。这里修改为 lib 启用库模式。
- --name: 库的名字。
- --dest : 输出目录，默认 dist。这里我们改成 lib
- [entry]: 最后一个参数为入口文件，默认为 src/App.vue。这里我们指定编译 packages/ 组件库目录。

# 案例

```
vue-cli-service build --target lib --name index --dest lib package/index.js
```

表示会打包为一个库，名字为index.js，目录为 /lib 下 ，源文件入口为  package/index.js
