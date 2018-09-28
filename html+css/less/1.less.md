
官网： https://less.bootcss.com/


# less

Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言



# 安装

Node.js 环境中使用 Less ：

```
npm install -g less
```
> lessc styles.less styles.css 

在浏览器环境中使用 Less ：
```html
<link rel="stylesheet/less" type="text/css" href="styles.less" />
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.8.1/less.min.js" ></script>
```


# 导入（Importing）

你可以导入一个 .less 文件，此文件中的所有变量就可以全部使用了

```
@import "typo.css";
```

# 注释（Comments）

块注释和行注释都可以使用：
```
/* 一个块注释
 * style comment! */
@var: red;

// 这一行被注释掉了！
@var: white;
```



# 变量

可以像 js 一样使用变量

```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```
编译为：
```css
#header {
  width: 10px;
  height: 20px;
}
```


# 嵌套（Nesting）

可以像 html 一样有层级关系

```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

编译为：
```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

在子级引用父级用 &
```
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```



# 混合（Mixins）

可以理解为 代码片段，将一组属性从一个规则集包含

```less
// 定义一个 Mixins
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

// 使用  Mixins
#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```


# 函数（Functions）

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。

函数的用法非常简单。下面这个例子将介绍如何利用 percentage 函数将 0.5 转换为 50%，将颜色饱和度增加 5%，以及颜色亮度降低 25% 并且色相值增加 8 等用法：

```
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```



# 运算（Operations）

可以像 js 一样运算

```less
// numbers are converted into the same units
@conversion-1: 5cm + 10mm; // result is 6cm
@conversion-2: 2 - 3cm - 5mm; // result is -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // result is 4px

// example with variables
@base: 5%;
@filler: @base * 2; // result is 10%
@other: @base + @filler; // result is 15%
```