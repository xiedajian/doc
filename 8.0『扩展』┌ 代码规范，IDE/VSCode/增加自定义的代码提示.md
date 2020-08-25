[参考](https://www.jianshu.com/p/22fd68ee52fd)


## 例如 输入 `cl` 提示 `console.log()`  

文件 → 首选项 → 用户代码片段 → 选择JavaScript.json

在json中加入：
```
    //输入‘cl’之后按 Tab就可以出来console.log
    "Print to console": {
        "prefix": "cl",
        "body": [
            "console.log('$1')"
        ],
        "description": "Log output to console"
    },
```

保存之后就可以在任何js代码片段中输入‘cl’之后按Tab或Enter就可以出来console.log()，并且$1表示鼠标停留位置，很方便。