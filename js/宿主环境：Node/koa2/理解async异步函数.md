

```

// async 让一个函数变成异步，会返回promise


// 1.首先一个正常函数
function getData() {
    return 'this is data'
}
console.log(getData());     // this is data

// 如果函数没有返回值，其实相当于返回了undefined
function noReultFun() {
    var a=1
}
console.log(noReultFun());     // undefined



// 2.打印一个 async 函数，会返回一个promise
async function getData2() {
    return 'this is async function data'
    //上边这种正常的函数返回，相当于会被 async 成下面这种写法
    return new Promise(resolve=>{
        resolve('this is async function data')
    })
}
console.log(getData2());    // Promise { 'this is async function data' }

// 如果函数没有返回值，相当于 promise.resolve() 的参数是 undefined
async function noResultAsyncFun() {
    var a=1;
    //上边这种正常的函数返回，相当于会被 async 成下面这种写法
    return new Promise(resolve=>{
        resolve(undefined)
    })
}
console.log(noResultAsyncFun());    // Promise { undefined }


// 3.既然 async 返回promise ，那么我们可以用 then 接着处理
getData2().then(data=>
    console.log(data)       // this is async function data
);


// 4.上边用then来处理async函数返回的promise虽然可以，但是还需要写类似回调函数那样的结构
// 这次用 await 来代替 then 处理

// var res = await getData2();     // 报错，await is only valid in async function


// 5.await 必须存在于 async 函数中
(async function testAsync() {
    var res = await getData2();
    console.log(res);           // this is async function data, 说明await等待成功
}())


/*
结论:
1. async 其实是把函数改成 promise 返回
2. async 函数可以用 then 来接着进行链式操作，和 promise 一样
3. await 简化了 then 的操作，更直观
4. await 使用时必须写在 async 函数中
* */

```

详细案例： icode 仓库的 js/async.js