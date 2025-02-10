
# Proxy

Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程
可以这样理解，Proxy就是在目标对象之前设置的一层拦截,外界想要访问都要经过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

Proxy 在这里可以理解为代理器

声明： `const proxy = new Proxy(target, handler)`
- target: 拦截的对象
- handler: 定义拦截的方法


方法：
- get(): 拦截对象属性的读取
- set(): 拦截对象设置属性,返回一个布尔值
- has(): 拦截 propKey in proxy 的操作，返回一个布尔值
- ownKeys(): 拦截对象属性遍历，返回一个数组
- deleteProperty()：拦截 delete proxy[propKey] 的操作，返回一个布尔值()
- apply()：拦截函数的调用，call 和 apply 操作
- construct()：拦截 new 命令，返回一个对象: 拦截 new 命令，返回一个对象

```
 let obj = {
  name: 'domesy',
  time: '2022-01-27',
  value: 1
 }
 
 let data = new Proxy(obj, {
     //get()
     get(target, key){
         return target[key].replace("2022", '2015')
     },
     
     //set()
     set(target, key, value) {
        if (key === "name") {
           return (target[key] = value);
        } else {
           return target[key];
         }
     },
     
     // has()
    has(target, key) {
        if (key === "name") {
            return target[key];
        } else {
            return false;
        }
    },
    // deleteProperty()
    deleteProperty(target, key) {
        if (key.indexOf("_") > -1) {
            delete target[key];
            return true;
        } else {
            return target[key];
        }
    },
    // ownKeys()
    ownKeys(target) {
        return Object.keys(target).filter((item) => item != "time");
    },
 })
 
 console.log(data.time) // 2015-01-27
 
 data.time = '2020'
 data.name = 'React'
 console.log(data) //Proxy {name: 'React', time: '2022-01-27', value: 1}
 
 // 拦截has()
 console.log("name" in data) // true
 console.log("time" in data) // false
 
 // 删除deleteProperty()
 delete monitor.time; // true
 
 // 遍历 ownKeys()
 console.log(Object.keys(data)); //['name', 'value']

 //apply()
 let sum = (...args) => {
    let num = 0;
    args.forEach((item) => {
        num += item;
    });
    return num;
 };

 sum = new Proxy(sum, {
    apply(target, ctx, args) {
        return target(...args) * 2;
    },
 });
 
 console.log(sum(1, 2)); // 6
 console.log(sum.call(null, 1, 2, 3)); // 12
 console.log(sum.apply(null, [1, 2, 3])); // 12
 
 //constructor()
 let User = class {
    constructor(name) {
        this.name = name;
    }
 }
 User = new Proxy(User, {
    construct(target, args, newTarget) {
        return new target(...args);
    },
  });
 console.log(new User("domesy")); // User {name: 'domesy'}

```





