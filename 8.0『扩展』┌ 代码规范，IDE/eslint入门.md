由于JS语法的灵活性，我们不得不借助于代码检查工具来避免可能出现的错误和规范我们的代码格式。

其实最终我们想达到的目标就是:舍弃一部分灵活性换取更高的稳定性和可维护性。

现在所有主流的静态检查工具其底层逻辑都是预定一些规则，然后检查出代码中不符合规则的地方加以调整。

那现在有这么多的静态代码检测工具，我们为什么要选择Eslint呢？

主要原因是他的灵活性比较高，易于扩展，所以有非常良好的生态，并且主流的编辑器都可以集成Eslint。

# ESlint

 JavaScript 的代码检查工具有：JSLint，JSHint， JSCS， ESLint，本文着重介绍 ESLint。

 ESLint 在一系列的代码质量检查工具中，是最年轻的一个，当然也是最现代化的。

 配置多样，支持 JavaScript， JSON 以及 YAML 格式的 .eslintrc.*文件，同时也支持在package.json用eslintConfig字段配置。



## 安装

ESLint 基于 Node 平台，所以 Nodejs 是必须安装的，然后通过 npm 安装 ESLint 包，至于全局安装还是作为开发依赖安装，取决于个人


npm i -g eslint


## 项目使用

项目根目录添加 Eslint 的配置文件（就是.eslintrc）


## webstrom 配置

每次改动后启动项目，ESlint都会检测你的代码，然后在浏览器的控制台疯狂报错。

一开始我是根据控制台的报错信息，一条一条回去修改的，但是这样的方式太低效。

一种高效的方式，可以直接让开发工具（webstorm or idea）识别ESlint，并且格式代码，过程是这样的：

webstorm 自带Eslint

设置 => Languages&Frameworks => Javascript => Code Quality Tools => ESLint

启用 enable 



# Eslint 配置

一个常见的配置文件内容如下：
```
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2015,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "script"
    },

    "env": {
        "es6": true,
        "node": true,
        "amd":true
    },

    "plugins": [
        "import",
        "node",
        "promise",
        "standard",
        "angular"
    ],
    "globals": {
        "document": false,
        "navigator": false,
        "window": false
    },
    "extends": ["eslint:recommended","standard","plugin:angular/johnpapa"],
    "rules":{
    }
}
```

"parserOptions"属性配置解析器内容。其中“ecmaVersion”属性配置JS的语法版本。“sourceType”属性配置JS文件加载模式，值为“script”或“module”。“ecmaFeatures”属性配置想要使用的额外语言特性。

“env”属性配置了预定义的全局环境。我们当前开启了“es6”、"node"、"amd"三个环境。

"plugins"属性配置需要加载的第三方插件。这里我们需要先安装对应插件才能使用。

“globals”属性定义了全局变量集合，包含在这个集合中的属性都会被工具认为是全局变量，no-undef 规则就不会发出警告。

"extends"属性配置基础规则，“rules”属性中配置的规则都是基于这个规则之上配置的。

"rules"属性配置检查规则。

除此，还有一个重要的配置，配置忽略哪些文件的配置。我们在实际场景中不可能检查所有文件，只会挑选出需要检查的文件进行检查。所以，这个配置我们会经常用到。

在我们的工程目录中新建一个文件，命名为“.eslintignore”，Eslint会自动识别这个文件。


# ESLint配置详解

解析器选项（parserOptions）
```
"parserOptions": {
     "ecmaVersion": 6,          //ES的版本，默认为5
     "sourceType": "module",    //指定源代码存在的位置，script | module，默认为script。
     "ecmaFeatures": {          //指定要使用其他那些语言对象
         "experimentalObjectRestSpread": true,//启用对对象的扩展
         "jsx": true,                       //启用jsx语法
         "globalReturn":true,               //允许return在全局使用
         "impliedStrict":true               //启用严格校验模式
     }
}
```

环境配置（env）
默认情况下，所有环境变量都为false，且这些环境并不冲突，可以自由选择搭配。
```
"env"{
  "browser":true,               //启用浏览器全局变量。
  "node":true,                  //Node.js全局变量和Node.js范围。
  "commonjs":true,              //CommonJS全局变量和CommonJS范围。
  "shared-node-browser":true,  //Node和Browser共同的全局。
  "es6" :ture,                      // 启用ES6的功能。
 "worker" :true ,                   //网络工作者全局变量。
  "amd" :true,                      //根据amd规范定义require()和define()作为全局变量。
  "mocha":true,                         //添加所有的摩卡测试全局变量。
  "jasmine":true,                       //添加1.3和2.0版本的所有Jasmine测试全局变量。
  "jest":true,                          //Jest全局变量。
  "phantomjs":true,                     //PhantomJS全局变量。
  "protractor":true,                    //量角器全局变量。
  "qunit":true,                         // QUnit全局变量。
  "jquery":true,                        //jQuery全局变量。
  "prototypejs":true,                   //Prototype.js全局变量。
  "shelljs":true,                       //ShellJS全局变量。
  "meteor":true,                        //流星全球变量。
  "mongo":true,                         // MongoDB全局变量。
  "applescript":true,                   //AppleScript全局变量。
  "nashorn":true,                       // Java 8 Nashorn全局变量。
  "serviceworker":true,                 // 服务工作者全局变量。
  "atomtest":true,                      // Atom测试助手全局变量
  "embertest":true,                     // Ember测试助手全局变量。
  "webextensions":true,                 // WebExtensions全局变量
  "greasemonkey":true                   // GreaseMonkey全局变量
}
```

全局变量（globals）
指定全局变量的值为true|false。true表示变量可以被覆盖，false表示不允许被覆盖。
```
"globals": {
        "document": true,
        "navigator": true,
        "window": true,
        "think": true
}
```

## 继承配置（extends）
通过扩展来快速的引入开源的JavaScript代码规则，也可以是继承文件的路径。如果值为绝对或相对路径则相当于导入路径对应的规则配置。
eslint:all:表示引入当前版本eslint的所有核心规则。
eslint:recommended:表示引入eslint的核心功能，并且报告一些常见的共同错误。

例如eslint官方推荐的规则：
```
extends: 'eslint:recommended'
```
或者是前端圈内很流行的airbnb 的规则,目前来看，公认的最好的标准是Airbnb标准:
```
"extends": "airbnb"
```

## 校验规则（rules）
Eslint附带了大量的校验规则，这些规则的值分别有如下规律：
off | 0 :表示关闭规则。
warn | 1 :表示将该规则转换为警告。
error | 2 :表示将该规则转换为错误。
具体的规则请查看：https://eslint.org/docs/rules/
```
 "rules": {
        //在定义对象的时候，getter/setter需要同时出现
        "accessor-pairs": 2,
        // 箭头函数中，在需要的时候，在参数外使用小括号（只有一个参数时，可以不适用括号，其它情况下都需要使用括号）
        "arrow-parens": [
            2,
            "as-needed"
        ],
        //箭头函数中的箭头前后需要留空格
        "arrow-spacing": [
            2,
            {
                "before": true,
                "after": true
            }
        ],
        //该条规则主要用于定义数组字面量定义数组时，前后是否加空格，接受两个可选配置，always 和never .
        //如果设置为always 那么就应该在在写数组是前后都留空格
        "array-bracket-spacing": [
            2,
            "never"
        ],
        //如果代码块是单行的时候，代码块内部前后需要留一个空格
        "block-spacing": [
            2,
            "always"
        ],
        //大括号语法采用『1tbs』,允许单行样式
        "brace-style": [
            2,
            "1tbs",
            {
                "allowSingleLine": true
            }
        ],
        /**
         *该规则会搜索代码中所有的下划线，它会忽略变量名开始和结尾的下划线而只检测变量中间的下划线。
         *如果ESLint认为一个变量是常量（所有字母大写），那么在变量名字母之间添加下划线也是可以而不会报错的。
         *该规则只检测生命和定义时的变量而不检测函数调用时的函数名。
         **/
        "camelcase": [
            2,
            {
                "properties": "never"
            }
        ],
        //在定义对象或数组时，最后一项不能加逗号
        "comma-dangle": [
            2,
            "never"
        ],
        //在写逗号时，逗号前面不需要加空格，而逗号后面需要添加空格
        "comma-spacing": [
            2,
            {
                "before": false,
                "after": true
            }
        ],
        //如果逗号可以放在行首或行尾时，那么请放在行尾
        "comma-style": [
            2,
            "last"
        ],
        //在constructor函数中，如果classes是继承其他class，那么请使用super。否者不使用super
        "constructor-super": 2,
        //在if-else语句中，如果if或else语句后面是多行，那么必须加大括号。如果是单行就应该省略大括号。
        "curly": [
            2,
            "multi-line"
        ],
        //该规则规定了.应该放置的位置，
        "dot-location": [
            2,
            "property"
        ],
        //使用=== !== 代替== != .
        "eqeqeq": [
            2,
            "allow-null"
        ],
        //该规则规定了generator函数中星号两边的空白。
        "generator-star-spacing": [
            2,
            {
                "before": true,
                "after": true
            }
        ],
        // 规定callback 如果有err参数，只能写出err 或者 error .
        "handle-callback-err": [
            2,
            "^(err|error)$"
        ],
        //这个就是关于用什么来缩进了，4个空格=两个tab .
        "indent": [
            1,
            2
        ],
        // keyword 前后需要空格
        "keyword-spacing": [
            2,
            {
                "before": true,
                "after": true,
                "overrides": {}
            }
        ],
        //该规则规定了在对象字面量语法中，key和value之间的空白，冒号前不要空格，冒号后面需要一个空格
        "key-spacing": [
            2,
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        //构造函数首字母大写
        "new-cap": [
            2,
            {
                "newIsCap": true,
                "capIsNew": false
            }
        ],
        //在使用构造函数时候，函数调用的圆括号不能够省略
        "new-parens": 2,
        //禁止使用Array构造函数
        "no-array-constructor": 2,
        //禁止使用arguments.caller和arguments.callee
        "no-caller": 2,
        //禁止覆盖class命名，也就是说变量名不要和class名重名
        "no-class-assign": 2,
        //禁止在case/default语句中使用lexical declarations，例如let, const, function and class .因为在case/default中的声明，
        //在整个switch语句中都能够访问到，如果实在需要声明变量，可以加大括号。
        "no-case-declarations": 2,
        //在条件语句中不要使用赋值语句
        "no-cond-assign": 2,
        //const申明的变量禁止修改
        "no-const-assign": 2,
        //在正则表达式中禁止使用控制符（详见官网）
        "no-control-regex": 2,
        //禁止使用debugger语句
        "no-debugger": 2,
        //禁止使用delete删除var申明的变量
        "no-delete-var": 2,
        //函数参数禁止重名
        "no-dupe-args": 2,
        //class中的成员禁止重名
        "no-dupe-class-members": 2,
        //在对象字面量中，禁止使用重复的key
        "no-dupe-keys": 2,
        //在switch语句中禁止重复的case
        "no-duplicate-case": 2,
        //禁止使用不匹配任何字符串的正则表达式
        "no-empty-character-class": 2,
        //禁止使用eval函数
        "no-eval": 2,
        //禁止对catch语句中的参数进行赋值
        "no-ex-assign": 2,
        //禁止扩展原生对象
        "no-extend-native": 2,
        //禁止在不必要的时候使用bind函数
        "no-extra-bind": 2,
        //在一个本来就会自动转化为布尔值的上下文中就没必要再使用!! 进行强制转化了。
        "no-extra-boolean-cast": 2,
        //禁止使用多余的圆括号
        "no-extra-parens": [
            2,
            "functions"
        ],
        //这条规则，简单来说就是在case语句中尽量加break，避免不必要的fallthrough错误，如果需要fall through，那么看官网。
        "no-fallthrough": 2,
        //简单来说不要写这样的数字.2 2.。应该写全，2.2 2.0 .
        "no-floating-decimal": 2,
        //禁止对函数名重新赋值
        "no-func-assign": 2,
        //禁止使用类eval的函数。
        "no-implied-eval": 2,
        //消除简写的类型转换，而推荐使用一种更加「自解释」的转换方法
        "no-implicit-coercion": 2,
        //禁止在代码块中定义函数（下面的规则仅限制函数）
        "no-inner-declarations": [
            2,
            "functions"
        ],
        //RegExp构造函数中禁止使用非法正则语句
        "no-invalid-regexp": 2,
        //在严格模式下，在classes或者classes-like对象外部使用this关键词this将被视为undefined 并且抛出TypeError错误。
        "no-invalid-this": 2,
        //禁止使用不规则的空白符
        "no-irregular-whitespace": 2,
        //禁止使用__iterator__属性
        "no-iterator": 2,
        //label和var申明的变量不能重名
        "no-label-var": 2,
        //禁止使用label语句
        "no-labels": [
            2,
            {
                "allowLoop": false,
                "allowSwitch": false
            }
        ],
        //禁止使用没有必要的嵌套代码块
        "no-lone-blocks": 2,
        //不要把空格和tab混用
        "no-mixed-spaces-and-tabs": 2,
        //顾名思义，该规则保证了在逻辑表达式、条件表达式、
        //申明语句、数组元素、对象属性、sequences、函数参数中不使用超过一个的空白符。
        "no-multi-spaces": 2,
        //该规则保证了字符串不分两行书写。
        "no-multi-str": 2,
        //空行不能够超过2行
        "no-multiple-empty-lines": [
            2,
            {
                "max": 2
            }
        ],
        //该规则保证了不重写原生对象。
        "no-native-reassign": 2,
        //在in操作符左边的操作项不能用! 例如这样写不对的：if ( !a in b) { //dosomething }
        "no-negated-in-lhs": 2,
        //当我们使用new操作符去调用构造函数时，需要把调用结果赋值给一个变量。
        "no-new": 2,
        //该规则保证了不使用new Function(); 语句。
        "no-new-func": 2,
        //不要通过new Object（），来定义对象
        "no-new-object": 2,
        //禁止把require方法和new操作符一起使用。
        "no-new-require": 2,
        //当定义字符串、数字、布尔值就不要使用构造函数了，String、Number、Boolean
        "no-new-wrappers": 2,
        //禁止无意得把全局对象当函数调用了，比如下面写法错误的：Math(), JSON()
        "no-obj-calls": 2,
        //不要使用八进制的语法。
        "no-octal": 2,
        //用的少，见官网。http://eslint.org/docs/rules/
        "no-octal-escape": 2,
        //不要使用__proto__
        "no-proto": 2,
        //不要重复申明一个变量
        "no-redeclare": 2,
        //正则表达式中不要使用空格
        "no-regex-spaces": 2,
        //return语句中不要写赋值语句
        "no-return-assign": 2,
        //不要和自身作比较
        "no-self-compare": 2,
        //不要使用逗号操作符，详见官网
        "no-sequences": 2,
        //禁止对一些关键字或者保留字进行赋值操作，比如NaN、Infinity、undefined、eval、arguments等。
        "no-shadow-restricted-names": 2,
        //函数调用时，圆括号前面不能有空格
        "no-spaced-func": 2,
        //禁止使用稀疏数组
        "no-sparse-arrays": 2,
        //在调用super之前不能使用this对象
        "no-this-before-super": 2,
        //严格限制了抛出错误的类型，简单来说只能够抛出Error生成的错误。但是这条规则并不能够保证你只能够
        //抛出Error错误。详细见官网
        "no-throw-literal": 2,
        //行末禁止加空格
        "no-trailing-spaces": 2,
        //禁止使用没有定义的变量，除非在／＊global＊／已经申明
        "no-undef": 2,
        //禁止把undefined赋值给一个变量
        "no-undef-init": 2,
        //禁止在不需要分行的时候使用了分行
        "no-unexpected-multiline": 2,
        //禁止使用没有必要的三元操作符，因为用些三元操作符可以使用其他语句替换
        "no-unneeded-ternary": [
            2,
            {
                "defaultAssignment": false
            }
        ],
        //没有执行不到的代码
        "no-unreachable": 2,
        //没有定义了没有被使用到的变量
        "no-unused-vars": [
            0,
            {
                "vars": "all",
                "args": "none"
            }
        ],
        //禁止在不需要使用call（）或者apply（）的时候使用了这两个方法
        "no-useless-call": 2,
        //不要使用with语句
        "no-with": 2,
        //在某些场景只能使用一个var来申明变量
        "one-var": [
            2,
            {
                "initialized": "never"
            }
        ],
        //在进行断行时，操作符应该放在行首还是行尾。并且还可以对某些操作符进行重写。
        "operator-linebreak": [
            2,
            "after",
            {
                "overrides": {
                    "?": "before",
                    ":": "before"
                }
            }
        ],
        //使用单引号
        "quotes": [
            1,
            "single",
            "avoid-escape"
        ],
        //在使用parseInt() 方法时，需要传递第二个参数，来帮助解析，告诉方法解析成多少进制。
        "radix": 2,
        //这就是分号党和非分号党关心的了，我们还是选择加分号
        "semi": [
            2,
            "always"
        ],
        //该规则规定了分号前后的空格，具体规定如下。
        "semi-spacing": [
            2,
            {
                "before": false,
                "after": true
            }
        ],
        //代码块前面需要加空格
        "space-before-blocks": [
            2,
            "always"
        ],
        //函数圆括号前面需要加空格
        "space-before-function-paren": [
            2,
            "never"
        ],
        //圆括号内部不需要加空格
        "space-in-parens": [
            2,
            "never"
        ],
        //操作符前后需要加空格
        "space-infix-ops": 2,
        //一元操作符前后是否需要加空格，单词类操作符需要加，而非单词类操作符不用加
        "space-unary-ops": [
            2,
            {
                "words": true,
                "nonwords": false
            }
        ],
        //评论符号｀／*｀ ｀／／｀，后面需要留一个空格
        "spaced-comment": [
            2,
            "always",
            {
                "markers": [
                    "global",
                    "globals",
                    "eslint",
                    "eslint-disable",
                    "*package",
                    "!",
                    ","
                ]
            }
        ],
        //推荐使用isNaN方法，而不要直接和NaN作比较
        "use-isnan": 2,
        //在使用typeof操作符时，作比较的字符串必须是合法字符串eg:'string' 'object'
        "valid-typeof": 2,
        //立即执行函数需要用圆括号包围
        "wrap-iife": [
            2,
            "any"
        ],
        //yoda条件语句就是字面量应该写在比较操作符的左边，而变量应该写在比较操作符的右边。
        //而下面的规则要求，变量写在前面，字面量写在右边
        "yoda": [
            2,
            "never"
        ],
        "require-yield": 0,
        //react组件文件使用.jsx
        "react/require-extension": [
            1,
            {
                "extensions": [
                    ".jsx"
                ]
            }
        ]
}
```