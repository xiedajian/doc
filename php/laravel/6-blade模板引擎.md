
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


#### 引入子视图
```
@include('child')
@include('child',['name'=>'xdj'])	//向子视图传参

//子视图案例 child.blade.html
<p> 我是被include的子视图 {{ $name }}</p>
```


#### 使用变量
{{$name}}

#### 模板中调用PHP代码
```
<p> {{ time() }} </p>
<p> {{ date('Y-m-d H:i:s') }} </p>
<p> {{ in_array($name , $array) ? 'true' : 'false' }} </p>
<p> {{ var_dump($array) }} </p>
<p> {{ isset($name) ? $name : 'default' }} </p>
<p> {{ $name or 'default' }} </p>
```

#### 原样输出{{
```
<p> @{{ $name }} </p>
```

#### 模板中的注释
```
{{--  模板中的注释  --}}
```

#### 模板中的流程控制
```
@if ($name == 'xdj')
	<p> {{ $name  }} </p>
@elseif ( in_array($name, $array))
	<p> default </p>
@else
	其他
@endif


// unless 是if 的取反
@unless($name =='xdj')
	<p> 我不是xdj </p>
@endunless
```


