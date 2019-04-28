


# Nunjuck 模板引擎语法规则


```
// 使用变量
<p>{{ msg }}</p>
<p>{{arr[0]}}</p>

// 过滤器 
<p>{{msg | upper}}</p>

// 输入html ，需要 safe 过滤器
<p>{{ h }}</p>
<p>{{ h | safe}}</p>

// if判断 
{% if hungry %}
  I am hungry
{% elif tired %}
  I am tired
{% else %}
  I am good!
{% endif %}


// for循环 
{% for ingredient, amount in food %}
    <p>Use {{ amount }} of {{ ingredient }}</p>
{% endfor %}


// 在egg框架中使用helper , router别名 
<a href="/demo/getdemo?name=xie&age=20">跳转至 getdemo </a>
<a href="{{helper.urlFor('index')}}">跳转至 首页 </a>


// 



```

# 模板继承 extends block

1.定义模板,比如 parent.html 的模板

``` 
{% block header %}
This is the default content
{% endblock %}

<section class="left">
  {% block left %}{% endblock %}
</section>

<section class="right">
  {% block right %}
  This is more content
  {% endblock %}
</section>
```

然后再写一个模板继承他

```
{% extends "parent.html" %}

{% block left %}
This is the left side!
{% endblock %}

{% block right %}
This is the right side!
{% endblock %}
```

以下为渲染结果
```
This is the default content

<section class="left">
  This is the left side!
</section>

<section class="right">
  This is the right side!
</section>
```

# 引入其他的模板 include

include 可引入其他的模板，可以在多模板之间共享一些小模板，如果某个模板已使用了继承那么 include 将会非常有用

```
{% include "item.html" %}
```

可在循环中引入模板

```
{% for item in items %}
{% include "item.html" %}
{% endfor %}
```


# raw

如果你想输出一些 Nunjucks 特殊的标签 (如 {{)，可以使用 {{)，可以使用 {% raw %} 将所有的内容输出为纯文本。



# 注释

你可以使用 {# and #} 来写注释，渲染时将会去除所有的注释。
```
{# Loop through all the users #}
{% for user in users %}...{% endfor %}
```


# 空白字符控制

模板在正常情况会将变量 (variable) 和标签区块 (tag blocks) 周围的空白字符完全输出。有时，你不想输出一些额外的空白字符，但代码又需要一些空白字符来显得整洁。

你可以在开始和结束区块 (start or end block tag) 添加 (-) 来去除前面和后面的空白字符。

```
{% for i in [1,2,3,4,5] -%}
  {{ i }}
{%- endfor %}
```
上面准确的输出为 "12345"，-%} 会去除标签右侧的空白字符，{%- 会去除标签之前的空白字符。



# 三元运算

和 javascript 的三元运算符 (ternary operator) 一样，可使用 if 的内联表达式：

```
{{ "true" if foo else "false" }}
```
当 foo 为 true 的时候最终输出 "true" 否则为 "false"，对于获取默认值的时候非常有用：
```
{{ baz(foo if foo else "default") }}
```









