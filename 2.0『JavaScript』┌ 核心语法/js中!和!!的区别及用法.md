
js中!的用法是比较灵活的，它除了做逻辑运算常常会用！做类型判断，可以用！与上对象来求得一个布尔值，


## 1、！可将变量转换成boolean类型，null、undefined和空字符串取反都为false，其余都为true。
```
!null=true

!undefined=true

!''=true

!100=false

!'abc'=false
```


## 2、！！常常用来做类型判断，在第一步!（变量）之后再做逻辑取反运算，在js中新手常常会写这样臃肿的代码：

判断变量a为非空，未定义或者非空串才能执行方法体的内容
```
var a;
if(a!=null&&typeof(a)!=undefined&&a!=''){
    //a有内容才执行的代码  
}
```

实际上我们只需要写一个判断表达：
```
if(!!a){
    //a有内容才执行的代码...  
}
```

就能和上面达到同样的效果。a是有实际含义的变量才执行方法，否则变量null，undefined和''空串都不会执行以下代码。

可以总结出来，“！”是逻辑与运算，并且可以与任何变量进行逻辑与将其转化为布尔值，“!!”则是逻辑与的取反运算，
尤其后者在判断类型时代码简洁高效，省去了多次判断null、undefined和空字符串的冗余代码。