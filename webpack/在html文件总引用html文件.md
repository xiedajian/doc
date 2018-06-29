
## 使用html-loader




index.html
```
<!--
   这里有个坑，html引用html，需要在语句前加html-loader，同时去掉webpack中全局的html-loader配置
-->
<%= require('html-loader!./layout.html') %>
<body id="css-zen-garden">
</body>
</html>

```


layout.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>CSS Zen Garden: The Beauty of CSS Design</title>
    <link rel="stylesheet" media="screen" href="style.css?v=8may2013">
    <link rel="alternate" type="application/rss+xml" title="RSS" href="http://www.csszengarden.com/zengarden.xml">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

```
