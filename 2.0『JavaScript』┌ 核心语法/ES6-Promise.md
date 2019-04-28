

# Promise

我们工作中免不了运用promise用来解决异步回调问题。平时用的很多库或者插件都运用了promise 例如axios、fetch等等

2015 年 6 月，ECMAScript 6 的正式版 终于发布了。

ES6 原生提供了 Promise 对象

所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。


Promise 对象有以下两个特点。

（1）对象的状态不受外界影响。

		Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。
		
		只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。

		Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。
		
		只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。
		
		就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。
		
		这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。


有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

Promise 也有一些缺点。

首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。

其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部

三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

```
var promise = new Promise( function(resolve, reject) { 
	
	if (/* 异步操作成功 */){
		resolve(value); 
	} else {
		reject(error); 
	}
	
});
			
promise.then(function(value) {
		// success
	}, function(value) { 
		// failure
	});
```

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 方法和 reject 方法。

如果异步操作成功，则用 resolve 方法将 Promise 对象的状态，从「未完成」变为「成功」（即从 pending 变为 resolved）；

如果异步操作失败，则用 reject 方法将 Promise 对象的状态，从「未完成」变为「失败」（即从 pending 变为 rejected）。


## 基本的 api

  Promise.resolve()
  Promise.reject()
  Promise.prototype.then()
  Promise.prototype.catch()
	Promise.all() 		// 所有的完成  var p = Promise.all([p1,p2,p3]);
  Promise.race() 		// 竞速，完成一个即可



## 进阶: 

promises 的奇妙在于给予我们以前的 return 与 throw，每个 Promise 都会提供一个 then() 函数，和一个 catch()，实际上是 then(null, ...) 函数，

我们可以做三件事，

1.return 另一个 promise

2.return 一个同步的值 (或者 undefined)

3.throw 一个同步异常 `thrownew Eror('');`


```
new Promise(function (resolve, reject) { 
	
	throw new Error('悲剧了，又出 bug 了'); 
	
}).catch(function(err){ 
	
	console.log(err); 
	
});
```







# 模拟Promise实现过程

## 1、Promise 的声明

首先呢，promise肯定是一个类，我们就用class来声明。

- 由于new Promise((resolve, reject)=>{})，所以传入一个参数（函数），秘籍里叫他executor，传入就执行。
- executor里面有两个参数，一个叫resolve（成功），一个叫reject（失败）。
- 由于resolve和reject可执行，所以都是函数，我们用let声明。

```javascript

	class Promise{
	  // 构造器
	  constructor(executor){
	    // 成功
	    let resolve = () => { };
	    // 失败
	    let reject = () => { };
	    // 立即执行
	    executor(resolve, reject);
	  }
	}

```


### 秘籍对Promise有规定：


Promise存在三个状态（state）pending、fulfilled、rejected


pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）


成功时，不可转为其他状态，且必须有一个不可改变的值（value）


失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）


new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。


new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。


若是executor函数报错 直接执行reject();


于是乎，我们获得以下代码:
```
	class Promise{
	  constructor(executor){
	    // 初始化state为等待态
	    this.state = 'pending';
	    // 成功的值
	    this.value = undefined;
	    // 失败的原因
	    this.reason = undefined;
	    let resolve = value => {
	      // state改变,resolve调用就会失败
	      if (this.state === 'pending') {
	        // resolve调用后，state转化为成功态
	        this.state = 'fulfilled';
	        // 储存成功的值
	        this.value = value;
	      }
	    };
	    let reject = reason => {
	      // state改变,reject调用就会失败
	      if (this.state === 'pending') {
	        // reject调用后，state转化为失败态
	        this.state = 'rejected';
	        // 储存失败的原因
	        this.reason = reason;
	      }
	    };
	    // 如果executor执行报错，直接执行reject
	    try{
	      executor(resolve, reject);
	    } catch (err) {
	      reject(err);
	    }
	  }
	}

```


### then方法

秘籍规定:Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因

当状态state为fulfilled，则执行onFulfilled，传入this.value。当状态state为rejected，则执行onRejected，传入this.value
onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数

```
	class Promise{
	  constructor(executor){...}
	  // then 方法 有两个参数onFulfilled onRejected
	  then(onFulfilled,onRejected) {
	    // 状态为fulfilled，执行onFulfilled，传入成功的值
	    if (this.state === 'fulfilled') {
	      onFulfilled(this.value);
	    };
	    // 状态为rejected，执行onRejected，传入失败的原因
	    if (this.state === 'rejected') {
	      onRejected(this.reason);
	    };
	  }
	}

```


### 解决异步实现

现在基本可以实现简单的同步代码，但是当resolve在setTomeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们


类似于发布订阅，先将then里面的两个函数储存起来，由于一个promise可以有多个then，所以存在同一个数组内

```
	// 多个then的情况
	let p = new Promise();
	p.then();
	p.then();
```

成功或者失败时，forEach调用它们

```
	class Promise{
	  constructor(executor){
	    this.state = 'pending';
	    this.value = undefined;
	    this.reason = undefined;
	    // 成功存放的数组
	    this.onResolvedCallbacks = [];
	    // 失败存放法数组
	    this.onRejectedCallbacks = [];
	    let resolve = value => {
	      if (this.state === 'pending') {
	        this.state = 'fulfilled';
	        this.value = value;
	        // 一旦resolve执行，调用成功数组的函数
	        this.onResolvedCallbacks.forEach(fn=>fn());
	      }
	    };
	    let reject = reason => {
	      if (this.state === 'pending') {
	        this.state = 'rejected';
	        this.reason = reason;
	        // 一旦reject执行，调用失败数组的函数
	        this.onRejectedCallbacks.forEach(fn=>fn());
	      }
	    };
	    try{
	      executor(resolve, reject);
	    } catch (err) {
	      reject(err);
	    }
	  }
	  then(onFulfilled,onRejected) {
	    if (this.state === 'fulfilled') {
	      onFulfilled(this.value);
	    };
	    if (this.state === 'rejected') {
	      onRejected(this.reason);
	    };
	    // 当状态state为pending时
	    if (this.state === 'pending') {
	      // onFulfilled传入到成功数组
	      this.onResolvedCallbacks.push(()=>{
	        onFulfilled(this.value);
	      })
	      // onRejected传入到失败数组
	      this.onRejectedCallbacks.push(()=>{
	        onRejected(this.reason);
	      })
	    }
	  }
	}


```


### 解决链式调用

我门常常用到new Promise().then().then(),这就是链式调用，用来解决回调地狱
1、为了达成链式，我们默认在第一个then里返回一个promise。秘籍规定了一种方法，就是在then里面返回一个新的promise,称为promise2：promise2 = new Promise((resolve, reject)=>{})

将这个promise2返回的值传递到下一个then中
如果返回一个普通的值，则将普通的值传递给下一个then中

2、当我们在第一个then中return了一个参数（参数未知，需判断）。这个return出来的新的promise就是onFulfilled()或onRejected()的值
秘籍则规定onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise

首先，要看x是不是promise。
如果是promise，则取它的结果，作为新的promise2成功的结果
如果是普通值，直接作为promise2成功的结果
所以要比较x和promise2
resolvePromise的参数有promise2（默认返回的promise）、x（我们自己return的对象）、resolve、reject
resolve和reject是promise2的

```
	class Promise{
	  constructor(executor){
	    this.state = 'pending';
	    this.value = undefined;
	    this.reason = undefined;
	    this.onResolvedCallbacks = [];
	    this.onRejectedCallbacks = [];
	    let resolve = value => {
	      if (this.state === 'pending') {
	        this.state = 'fulfilled';
	        this.value = value;
	        this.onResolvedCallbacks.forEach(fn=>fn());
	      }
	    };
	    let reject = reason => {
	      if (this.state === 'pending') {
	        this.state = 'rejected';
	        this.reason = reason;
	        this.onRejectedCallbacks.forEach(fn=>fn());
	      }
	    };
	    try{
	      executor(resolve, reject);
	    } catch (err) {
	      reject(err);
	    }
	  }
	  then(onFulfilled,onRejected) {
	    // 声明返回的promise2
	    let promise2 = new Promise((resolve, reject)=>{
	      if (this.state === 'fulfilled') {
	        let x = onFulfilled(this.value);
	        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
	        resolvePromise(promise2, x, resolve, reject);
	      };
	      if (this.state === 'rejected') {
	        let x = onRejected(this.reason);
	        resolvePromise(promise2, x, resolve, reject);
	      };
	      if (this.state === 'pending') {
	        this.onResolvedCallbacks.push(()=>{
	          let x = onFulfilled(this.value);
	          resolvePromise(promise2, x, resolve, reject);
	        })
	        this.onRejectedCallbacks.push(()=>{
	          let x = onRejected(this.reason);
	          resolvePromise(promise2, x, resolve, reject);
	        })
	      }
	    });
	    // 返回promise，完成链式
	    return promise2;
	  }
	}
```


### 完成resolvePromise函数
秘籍规定了一段代码，让不同的promise代码互相套用，叫做resolvePromise

如果 x === promise2，则是会造成循环引用，自己等待自己完成，则报“循环引用”错误

```
	let p = new Promise(resolve => {
	  resolve(0);
	});
	var p2 = p.then(data => {
	  // 循环引用，自己等待自己完成，一辈子完不成
	  return p2;
	})
```

1、判断x

Otherwise, if x is an object or function,Let then be x.then
x 不能是null
x 是普通值 直接resolve(x)
x 是对象或者函数（包括promise），let then = x.then
2、当x是对象或者函数（默认promise）
声明了then
如果取then报错，则走reject()
如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
如果成功的回调还是pormise，就递归继续解析
3、成功和失败只能调用一个 所以设定一个called来防止多次调用

```
	function resolvePromise(promise2, x, resolve, reject){
	  // 循环引用报错
	  if(x === promise2){
	    // reject报错
	    return reject(new TypeError('Chaining cycle detected for promise'));
	  }
	  // 防止多次调用
	  let called;
	  // x不是null 且x是对象或者函数
	  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
	    try {
	      // A+规定，声明then = x的then方法
	      let then = x.then;
	      // 如果then是函数，就默认是promise了
	      if (typeof then === 'function') { 
	        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
	        then.call(x, y => {
	          // 成功和失败只能调用一个
	          if (called) return;
	          called = true;
	          // resolve的结果依旧是promise 那就继续解析
	          resolvePromise(promise2, y, resolve, reject);
	        }, err => {
	          // 成功和失败只能调用一个
	          if (called) return;
	          called = true;
	          reject(err);// 失败了就失败了
	        })
	      } else {
	        resolve(x); // 直接成功即可
	      }
	    } catch (e) {
	      // 也属于失败
	      if (called) return;
	      called = true;
	      // 取then出错了那就不要在继续执行了
	      reject(e); 
	    }
	  } else {
	    resolve(x);
	  }
	}

```


### 解决其他问题

1、秘籍规定onFulfilled,onRejected都是可选参数，如果他们不是函数，必须被忽略

onFulfilled返回一个普通的值，成功时直接等于 value => value
onRejected返回一个普通的值，失败时如果直接等于 value => value，则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误reason => throw err
2、秘籍规定onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
如果onFulfilled或onRejected报错，则直接返回reject()

```
	class Promise{
	  constructor(executor){
	    this.state = 'pending';
	    this.value = undefined;
	    this.reason = undefined;
	    this.onResolvedCallbacks = [];
	    this.onRejectedCallbacks = [];
	    let resolve = value => {
	      if (this.state === 'pending') {
	        this.state = 'fulfilled';
	        this.value = value;
	        this.onResolvedCallbacks.forEach(fn=>fn());
	      }
	    };
	    let reject = reason => {
	      if (this.state === 'pending') {
	        this.state = 'rejected';
	        this.reason = reason;
	        this.onRejectedCallbacks.forEach(fn=>fn());
	      }
	    };
	    try{
	      executor(resolve, reject);
	    } catch (err) {
	      reject(err);
	    }
	  }
	  then(onFulfilled,onRejected) {
	    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
	    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
	    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
	    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
	    let promise2 = new Promise((resolve, reject) => {
	      if (this.state === 'fulfilled') {
	        // 异步
	        setTimeout(() => {
	          try {
	            let x = onFulfilled(this.value);
	            resolvePromise(promise2, x, resolve, reject);
	          } catch (e) {
	            reject(e);
	          }
	        }, 0);
	      };
	      if (this.state === 'rejected') {
	        // 异步
	        setTimeout(() => {
	          // 如果报错
	          try {
	            let x = onRejected(this.reason);
	            resolvePromise(promise2, x, resolve, reject);
	          } catch (e) {
	            reject(e);
	          }
	        }, 0);
	      };
	      if (this.state === 'pending') {
	        this.onResolvedCallbacks.push(() => {
	          // 异步
	          setTimeout(() => {
	            try {
	              let x = onFulfilled(this.value);
	              resolvePromise(promise2, x, resolve, reject);
	            } catch (e) {
	              reject(e);
	            }
	          }, 0);
	        });
	        this.onRejectedCallbacks.push(() => {
	          // 异步
	          setTimeout(() => {
	            try {
	              let x = onRejected(this.reason);
	              resolvePromise(promise2, x, resolve, reject);
	            } catch (e) {
	              reject(e);
	            }
	          }, 0)
	        });
	      };
	    });
	    // 返回promise，完成链式
	    return promise2;
	  }
	}

```

### 大功告成

```
	class Promise{
	  constructor(executor){
	    this.state = 'pending';
	    this.value = undefined;
	    this.reason = undefined;
	    this.onResolvedCallbacks = [];
	    this.onRejectedCallbacks = [];
	    let resolve = value => {
	      if (this.state === 'pending') {
	        this.state = 'fulfilled';
	        this.value = value;
	        this.onResolvedCallbacks.forEach(fn=>fn());
	      }
	    };
	    let reject = reason => {
	      if (this.state === 'pending') {
	        this.state = 'rejected';
	        this.reason = reason;
	        this.onRejectedCallbacks.forEach(fn=>fn());
	      }
	    };
	    try{
	      executor(resolve, reject);
	    } catch (err) {
	      reject(err);
	    }
	  }
	  then(onFulfilled,onRejected) {
	    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
	    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
	    let promise2 = new Promise((resolve, reject) => {
	      if (this.state === 'fulfilled') {
	        setTimeout(() => {
	          try {
	            let x = onFulfilled(this.value);
	            resolvePromise(promise2, x, resolve, reject);
	          } catch (e) {
	            reject(e);
	          }
	        }, 0);
	      };
	      if (this.state === 'rejected') {
	        setTimeout(() => {
	          try {
	            let x = onRejected(this.reason);
	            resolvePromise(promise2, x, resolve, reject);
	          } catch (e) {
	            reject(e);
	          }
	        }, 0);
	      };
	      if (this.state === 'pending') {
	        this.onResolvedCallbacks.push(() => {
	          setTimeout(() => {
	            try {
	              let x = onFulfilled(this.value);
	              resolvePromise(promise2, x, resolve, reject);
	            } catch (e) {
	              reject(e);
	            }
	          }, 0);
	        });
	        this.onRejectedCallbacks.push(() => {
	          setTimeout(() => {
	            try {
	              let x = onRejected(this.reason);
	              resolvePromise(promise2, x, resolve, reject);
	            } catch (e) {
	              reject(e);
	            }
	          }, 0)
	        });
	      };
	    });
	    return promise2;
	  }
	  catch(fn){
	    return this.then(null,fn);
	  }
	}
	function resolvePromise(promise2, x, resolve, reject){
	  if(x === promise2){
	    return reject(new TypeError('Chaining cycle detected for promise'));
	  }
	  let called;
	  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
	    try {
	      let then = x.then;
	      if (typeof then === 'function') { 
	        then.call(x, y => {
	          if(called)return;
	          called = true;
	          resolvePromise(promise2, y, resolve, reject);
	        }, err => {
	          if(called)return;
	          called = true;
	          reject(err);
	        })
	      } else {
	        resolve(x);
	      }
	    } catch (e) {
	      if(called)return;
	      called = true;
	      reject(e); 
	    }
	  } else {
	    resolve(x);
	  }
	}
	//resolve方法
	Promise.resolve = function(val){
	  return new Promise((resolve,reject)=>{
	    resolve(val)
	  });
	}
	//reject方法
	Promise.reject = function(val){
	  return new Promise((resolve,reject)=>{
	    reject(val)
	  });
	}
	//race方法 
	Promise.race = function(promises){
	  return new Promise((resolve,reject)=>{
	    for(let i=0;i<promises.length;i++){
	      promises[i].then(resolve,reject)
	    };
	  })
	}
	//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
	Promise.all = function(promises){
	  let arr = [];
	  let i = 0;
	  function processData(index,data){
	    arr[index] = data;
	    i++;
	    if(i == promises.length){
	      resolve(arr);
	    };
	  };
	  return new Promise((resolve,reject)=>{
	    for(let i=0;i<promises.length;i++){
	      promises[i].then(data=>{
	        processData(i,data);
	      },reject);
	    };
	  });
	}


```


参考文档： https://juejin.im/post/5b2f02cd5188252b937548ab
