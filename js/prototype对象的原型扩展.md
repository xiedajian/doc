

# JavaScript 对象的原型扩展

prototype在软件界的意思为原型即表对象的初始形态。JavaScript 中的 prototype。

js的所有function类型的对象都有一个prototype 属性。这个 prototype 属性本身又是一个object 类型的对象，因此可以给这个 prototype 对象添加任意的属性和方法。

```
function person(name, age){
    this._name = name;
    this._age  = age;
}
//给person函数的原型添加say方法。
person.prototype.say = function(){
    console.log(this._name);
}

//实例化person得到张三对象
var zhangsan = new person('zhangsan', 20);

//执行张三方法
zhangsan.say();
```


在 JavaScript 内部，对象的属性和方法追溯机制是通过所谓的 prototype 链来实现的。

当用 new 操作符构造对象时，也会同时将构造函数的 prototype 对象指派给新创建的对象，成为该对象内置的原型对象。

对象内置的原型对象应该是对外不可见的，尽管有些浏览器(如 Firefox)可以让我们访问这个内置原型对象，但并不建议这样做。

这就是JavaScript的“继承”！

有了继承我们可以对已有对象（包含js内置对象、自定义对象）进行方便的扩展了！