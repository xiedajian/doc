
npm 文档： https://www.npmjs.com/package/svg-captcha




# svg-captcha

在node.js中生成svg验证码


# 安装

```
npm install --save svg-captcha
```


# API

## 1. svgCaptcha.create(options)

如果没有传递选项，您将获得一个包含四个字符和相应svg的随机字符串

- size：4               //随机字符串的大小
- ignoreChars：'0o1i'   //过滤掉一些像0o1i这样的字符
- noise：1              //噪声线数
- color：true           //字符将具有不同的颜色而不是灰色，如果设置了background选项，则为true
- background：'＃cc9966'// svg图像的背景颜色

此函数返回具有以下属性的对象：

- data：string  // svg路径数据
- text：string  // captcha文本


## 2. svgCaptcha.createMathExpr(options)

与create api类似，您有相同的选项和返回值。区别在于数据是svg将是屏幕上的数学方程式，而文本将是字符串中该等式的结果，否则用法与上面相同


## 3. svgCaptcha.loadFont(url)

加载您自己的字体并覆盖默认字体

## 4. svgCaptcha.options

获取对全局设置对象的访问权限。它用于create和createMathExpr api作为默认选项

除了大小，噪点，颜色和背景，您还可以设置以下属性：

- width：number // captcha的宽度
- height：number //验证码的高度
- fontSize：number // captcha文本大小
- charPreset：string //随机字符预设


## 5. svgCaptcha.randomText([size|options])

返回一个随机字符串


## 6. 

根据提供的文本返回svg验证码




# 使用

```
var svgCaptcha = require('svg-captcha');
 
var captcha = svgCaptcha.create();
console.log(captcha);
// {data: '<svg.../svg>', text: 'abcd'}
```
