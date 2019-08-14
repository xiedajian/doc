关闭 eslint
直接注释掉 package.json 文件中 eslint 的配置就可以了（以下是 vue-cli 的默认配置）

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

或者 vue.config.js 中将以下三项设置为 false

```
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        lintOnSave: false
    }
```
