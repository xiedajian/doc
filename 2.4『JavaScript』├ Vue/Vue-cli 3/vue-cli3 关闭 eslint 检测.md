


vue-cli3 新建项目的默认在package.json 文件中 eslintConfig 配置

```
  "eslintConfig": {
     "root": true,////此项是用来告诉eslint找当前配置文件不能往父级查找
     "env": {
       "node": true//此项指定环境的全局变量，下面的配置指定为node环境
     },
     "extends": [// 此项是用来配置vue.js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
       "plugin:vue/essential",
       "@vue/standard"
     ],
     "rules": {//规则配置写在这里
       "indent": [1, 4]
     },
     "parserOptions": {
       "parser": "babel-eslint"//此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
     }
   },
```

# 取消 ESLint 校验（不推荐取消）

方式一：直接注释掉 package.json 中的 eslintConfig 就可以了

方式二： vue.config.js 中进行如下设置 lintOnSave: false 即可

```
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        lintOnSave: false
    }
```

[官方文档](https://cli.vuejs.org/zh/config/#lintonsave)