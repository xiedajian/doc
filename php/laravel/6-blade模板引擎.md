
使用变量
{{$name}}

## 模板继承
yield       // 用来展示某个sectionn内容，可以理解为占位符
section    // 定义一个视图片段，与yield的区别在可扩展，也可以有内容，也可以与子模板扩展
extends     //继承
parent      //输出父模板中原有的

#### layouts
```html
<head>
    <title> 标题 @yield('title')</title>
</head>
<body>
    <header>
        @section('header')
        @show
    </header>
    <content>
        @yield('content','主内容');
    </content>
    <footer>
        @section('footer')
            底部
        @show
    </footer>
</body>
```
#### home.html使用layout
```html
@extends('layouts');

@section('title')
    标题
@stop
@section('header')
    hello header
@stop
@section('content')
    @parent  
    hello content
@stop
@section('footer')
    @parent  
    hello footer
@stop

```
