


# 1. typeof

可以判断出'string','number','boolean','undefined','symbol'
但判断 typeof(null) 时值为 'object'; 判断数组和对象时值均为 'object'

# 2. instanceof

原理是 构造函数的 prototype 属性是否出现在对象的原型链中的任何位置

```
function A() {}
let a = new A();
a instanceof A     //true,因为 Object.getPrototypeOf(a) === A.prototype;
```


# 3. Object.prototype.toString.call()

常用于判断浏览器内置对象,对于所有基本的数据类型都能进行判断，即使是 null 和 undefined

# 4. Array.isArray()

用于判断是否为数组


# 总结

通用方案：
```js
/**
 * 判断类型
 * @param {*} target 
 */
function getType(obj) {
  const str = Object.prototype.toString.call(obj);
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[str];
}
```