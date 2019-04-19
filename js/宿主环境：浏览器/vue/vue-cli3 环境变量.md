官网文档：https://cli.vuejs.org/zh/guide/mode-and-env.html

vue-cli3.0 移除了配置文件目录： config 和 build 文件夹。可以说是非常的精简了，那移除了配置文件目录后如何自定义配置环境变量和模式呢?

# 环境变量

你可以替换你的项目根目录中的下列文件来指定环境变量：

```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

一个环境文件只包含环境变量的“键=值”对：

```
VUE_APP_TITLE=dev
VUE_APP_SECRET=secret
```

被载入的变量将会对 vue-cli-service 的所有命令、插件和依赖可用。


# 环境变量的使用


默认情况下，一个 Vue CLI 项目有三个模式：
```
.env.development        # 用于 vue-cli-service serve
.env.production         # 用于 vue-cli-service build 和 vue-cli-service test:e2e
.env.test         		# 用于 vue-cli-service test:unit
```

设置完环境变量之后就可以在我们的项目中使用这两个变量了。
```
process.env.VUE_APP_SECRET
```

不过还需要注意的是在项目的不同地方使用，限制也不一样。

在项目中，也就是 src 中使用环境变量的话，必须以 VUE*APP*开头。

例如我们可以在 main.js 中直接输出：console.log(process.env.VUE_APP_SECRET)
