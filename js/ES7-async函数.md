

阮一峰文档：http://es6.ruanyifeng.com/#docs/async
参考文档：https://www.cnblogs.com/zhuanzhuanfe/p/7493433.html

# ES8新特性 异步函数(Async functions)

## 为什么要引入async

众所周知，JavaScript语言的执行环境是“单线程”的，那么异步编程对JavaScript语言来说就显得尤为重要。

以前我们大多数的做法是使用回调函数来实现JavaScript语言的异步编程。

回调函数本身没有问题，但如果出现多个回调函数嵌套，

例如：进入某个页面，需要先登录，拿到用户信息之后，调取用户商品信息，代码如下：

```
this.$http.jsonp('/login', (res) => {
  this.$http.jsonp('/getInfo', (info) => {
    // do something
  })
})
```
假如上面还有更多的请求操作，就会出现多重嵌套。代码很快就会乱成一团，这种情况就被称为“回调函数地狱”（callback hell）。

下面我们来讲一下回调地狱解决办法的发展史



# Promise

为了避免回调，提出了Promise，它将回调函数的嵌套，改成了链式调用。写法如下：
```
var promise = new Promise((resolve, reject) => {
  this.login(resolve)
})
.then(() => this.getInfo())
.catch(() => { console.log("Error") })
```

从上面可以看出，Promise的写法只是回调函数的改进，使用then方法，只是让异步任务的两段执行更清楚而已。

Promise的最大问题是代码冗余，请求任务多时，一堆的then，也使得原来的语义变得很不清楚。

此时我们引入了另外一种异步编程的机制：Generator。



# Generator。

Generator 函数是一个普通函数，但是有两个特征。

一是，function关键字与函数名之间有一个星号 *

二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

一个简单的例子用来说明它的用法：

```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

上面代码定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield表达式（hello和world），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。

不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，必须调用遍历器对象的next方法，使得指针移向下一个状态。

也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。

换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。上述代码分步执行如下：

```
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

Generator函数的机制更符合我们理解的异步编程思想。

用户登录的例子，我们用Generator来写，如下：

```
var gen = function* () {
  const f1 = yield this.login()
  const f2 = yield this.getInfo()
};
```

虽然Generator将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。

此时，我们便希望能出现一种能自动执行Generator函数的方法。

我们的主角来了：async/await。



# async  await

ES8引入了async函数，使得异步操作变得更加方便。简单说来，它就是Generator函数的语法糖。

```
async function asyncFunc(params) {
  const result1 = await this.login()
  const result2 = await this.getInfo()
}
```

是不是更加简洁易懂呢？

*async函数的返回值是 Promise 对象。可以用then方法指定下一步的操作*

*进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖*

当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。



## 变体:

异步函数存在以下四种使用形式：

```
函数声明： async function foo() {}
函数表达式： const foo = async function() {}
对象的方式： let obj = { async foo() {} }
箭头函数： const foo = async () => {}
```

## 常见用法汇总:

处理单个异步结果：

```
async function asyncFunc() {
  const result = await otherAsyncFunc();
  console.log(result);
}
```

顺序处理多个异步结果：

```
async function asyncFunc() {
  const result1 = await otherAsyncFunc1();
  console.log(result1);
  const result2 = await otherAsyncFunc2();
  console.log(result2);
}
```

并行处理多个异步结果：

```
async function asyncFunc() {
  const [result1, result2] = await Promise.all([
    otherAsyncFunc1(),
    otherAsyncFunc2()
  ]);
  console.log(result1, result2);
}
```

处理错误：

```
async function asyncFunc() {
  try {
    await otherAsyncFunc();
  } catch (err) {
    console.error(err);
  }
}
```

若想进一步了解async的具体实践，可参见阮一峰的博客文章，链接奉上：http://es6.ruanyifeng.com/#docs/async
