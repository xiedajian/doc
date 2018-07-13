
参考文档： http://javascript.ruanyifeng.com/bom/history.html


# window History

window.history 对象包含浏览器的历史。

以window下面的的属性可以不带window前缀， window.history对象在编写时可不使用 window 这个前缀

为了保护用户隐私，对 JavaScript 访问该对象的方法做出了限制



## 读取使用history



- history.back()	  		与在浏览器点击后退按钮相同
 
- history.forward() 		与在浏览器中点击向前按钮相同
 
- history.go( num )	 	前往的第num个页面  （当前页面相对索引是0）
- history.go(0)			刷新当前页面
- history.go(1)			前进一页页面，相当于forward
- history.go(-1)			后退一页，相对于back
- history.go(-2)			后退两页
 
 
- history.length  		查看length属性的值来确定历史堆栈中的页数




## 添加和修改history实体

HTML5 history新特性pushState、replaceState 这些方法与window.onpopstate事件一起使用。


用于单页面SPA做为路由很有用

- history.pushState（）			// 不刷新当前页面的情况下更改URL，在历史中添加一条记录

- history.replaceState（）		// 不刷新当前页面的情况下更改URL，用来修改 History 对象的当前记录

- history.state 				// history.state属性返回当前页面的state对象

- popstate 事件					// 每当同一个文档的浏览历史（即history对象）出现变化时，就会触发onpopstate事件。


- URLSearchParams				//  用于处理 URL 之中的查询字符串，即问号之后的部分



#### pushState()

History.pushState()方法用于在历史中添加一条记录。当前页面不会刷新

```
	history.pushState(stateObj, title, url);
```

history.pushState方法接受三个参数，依次为：


- state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。

- title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。

- url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。



假定当前网址是example.com/1.html，我们使用pushState方法在浏览记录（history对象）中添加一个新记录。


var stateObj = { foo: 'bar' };

history.pushState(stateObj, 'page 2', '2.html');

添加上面这个新记录后，浏览器地址栏立刻显示example.com/2.html，但并不会跳转到2.html，甚至也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。

假定这时你访问了google.com，然后点击了倒退按钮，页面的url将显示2.html，但是内容还是原来的1.html。你再点击一次倒退按钮，url将显示1.html，内容不变。



总之，pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏会有反应。



#### replaceState()

history.replaceState方法的参数与pushState方法一模一样，区别是它修改浏览历史中当前纪录。


```

	history.pushState({page: 1}, 'title 1', '?page=1')
	// URL 显示为 http://example.com/example.html?page=1

	history.pushState({page: 2}, 'title 2', '?page=2');
	// URL 显示为 http://example.com/example.html?page=2

	history.replaceState({page: 3}, 'title 3', '?page=3');
	// URL 显示为 http://example.com/example.html?page=3

	history.back()
	// URL 显示为 http://example.com/example.html?page=1

	history.back()
	// URL 显示为 http://example.com/example.html

	history.go(2)
	// URL 显示为 http://example.com/example.html?page=3

```


#### history.state

 history.state属性返回当前页面的state对象

```

	var currentState = history.state;

```

#### popstate 事件

每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。

需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用back、forward、go方法时才会触发。

另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

使用的时候，可以为popstate事件指定回调函数。这个回调函数的参数是一个event事件对象，它的state属性指向pushState和replaceState方法为当前URL所提供的状态对象（即这两个方法的第一个参数）。

```
	window.addEventListener('popstate', function(event) {

	  console.log('location: ' + document.location);

	  console.log('state: ' + JSON.stringify(event.state));

	});

```



#### URLSearchParams

URLSearchParams API 用于处理 URL 之中的查询字符串，即问号之后的部分。没有部署这个API的浏览器，可以用url-search-params这个垫片库。


- has()：返回一个布尔值，表示是否具有某个参数
- get()：返回指定参数的第一个值
- getAll()：返回一个数组，成员是指定参数的所有值
- set()：设置指定参数
- delete()：删除指定参数
- append()：在查询字符串之中，追加一个键值对
- toString()：返回整个查询字符串


```

	var paramsString = 'q=URLUtils.searchParams&topic=api';
	var searchParams = new URLSearchParams(paramsString);

	searchParams.has('topic') // true
	searchParams.get('topic') // "api"
	searchParams.getAll('topic') // ["api"]

	searchParams.get('foo') // null，注意Firefox返回空字符串
	searchParams.set('foo', 2);
	searchParams.get('foo') // 2

	searchParams.append('topic', 'webdev');
	searchParams.toString() // "q=URLUtils.searchParams&topic=api&foo=2&topic=webdev"

	searchParams.append('foo', 3);
	searchParams.getAll('foo') // [2, 3]

	searchParams.delete('topic');
	searchParams.toString() // "q=URLUtils.searchParams&foo=2&foo=3"
```


- keys()：遍历所有参数名
- values()：遍历所有参数值
- entries()：遍历所有参数的键值对

```
	var searchParams = new URLSearchParams('key1=value1&key2=value2');

	for (var key of searchParams.keys()) {
	  console.log(key);
	}
	// key1
	// key2

	for (var value of searchParams.values()) {
	  console.log(value);
	}
	// value1
	// value2

	for (var pair of searchParams.entries()) {
	  console.log(pair[0]+ ', '+ pair[1]);
	}
	// key1, value1
	// key2, value2


```
