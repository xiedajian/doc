

# RegExp 对象

正则表达式是描述字符模式的对象

用于对字符串模式匹配及检索替换

## 语法

```
var reg = new RegExp(pattern, modifiers);
或者更简单的方式：
var reg = /pattern/modifiers;
```
- pattern (模式)描述匹配规则
- modifiers (修饰符)用于指定 是否全局匹配，区分大小写和多行匹配
    - i 大小写不敏感
    - g 全局匹配
    - m 执行多行匹配
  

## 方括号

[abc]
[^abc]
[0-9]
[a-z]
[A-Z]
[A-z]
[adgk]
[^adgk]
(red|blue|green)

## 元字符

\w
\W
\d
\D
\s
\S
\b
\B
\0
\n
\f
\r
\t
\v
\xxx
\xdd
\uxxxx

## 量词

n+
n*
n?
n{X}
n{x,}
n{x,y}
n$
^n
?=n
?!n


## 方法

RegExp.exec(str)            检索字符串,匹配到就返回匹配值，没有则返回null
RegExp.test(str)            检测字符串是否符合规则，返回bool    
RegExp.toString()           正则表达式转为字符串



## 属性

constructor             返回一个函数
global                  是否设置了 g 修饰符
ignoreCase              是否设置了 i 修饰符
lastIndex               用于规定下次匹配的起始位置
multiline               是否设置了 m 修饰符
source                  返回正则的表达式的规则
