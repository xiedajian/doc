# js

JavaScript 是一种轻量级的脚本语言。所谓“脚本语言”（script language），指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序（比如浏览器）的“脚本”。

JavaScript 也是一种嵌入式（embedded）语言。它本身提供的核心语法不算很多，只能用来做一些数学和逻辑运算。JavaScript 本身不提供任何与 I/O（输入/输出）相关的 API，都要靠宿主环境（host）提供，所以 JavaScript 只合适嵌入更大型的应用程序环境，去调用宿主环境提供的底层 API。

目前，已经嵌入 JavaScript 的宿主环境有多种，最常见的环境就是浏览器，另外还有服务器环境，也就是 Node 项目。

JavaScript 的核心语法部分相当精简，只包括两个部分：基本的语法构造和标准库。除此之外，各种宿主环境提供额外的 API，以便 JavaScript 调用。



## 使用领域

依靠宿主环境，向通用的系统语言发展

1. 浏览器平台化

	随着 HTML5 的出现，浏览器本身的功能越来越强。JavaScript 因此得以调用许多系统功能，比如操作本地文件、操作图片、调用摄像头和麦克风等等。这使得 JavaScript 可以完成许多以前无法想象的事情。

2. Node

	Node 项目使得 JavaScript 可以用于开发服务器端的大型项目，网站的前后端都用 JavaScript 开发已经成为了现实。有些嵌入式平台（Raspberry Pi）能够安装 Node，于是 JavaScript 就能为这些平台开发应用程序。

3. 数据库操作

	NoSQL 数据库这个概念，本身就是在 JSON（JavaScript Object Notation）格式的基础上诞生的，大部分 NoSQL 数据库允许 JavaScript 直接操作。

4. 移动平台开发

	JavaScript 也正在成为手机应用的开发语言。
	一般来说，安卓平台使用 Java 语言开发，iOS 平台使用 Objective-C 或 Swift 语言开发。许多人正在努力，让 JavaScript 成为各个平台的通用开发语言。
	PhoneGap 项目就是将 JavaScript 和 HTML5 打包在一个容器之中，使得它能同时在 iOS 和安卓上运行。
	Facebook 公司的 React Native 项目则是将 JavaScript 写的组件，编译成原生组件，从而使它们具备优秀的性能

5. 跨平台的桌面应用

	Chromium OS、Windows 8 等操作系统直接支持 JavaScript 编写应用程序。Mozilla 的 Open Web Apps 项目、Google 的 Chrome App 项目、Github 的 Electron 项目、以及 TideSDK 项目，都可以用来编写运行于 Windows、Mac OS 和 Android 等多个桌面平台的程序，不依赖浏览器。

	

## 运行环境

脚本语言，需要借助引擎（解释器）来运行，所以需要封装了引擎的环境.

封装了js引擎的环境分为两类，浏览器环境，非浏览器环境（nodejs, mongoDB）

浏览器环境下js有三部分组成，分别是ECMAScript，DOM，BOM

非浏览器环境，比如node，也是以ECMAScript为基础，扩展出了I/O操作，文件操作，数据库操作等等



## 运行机制

了解了JavaScript的运行环境，我们来看看运行机制。这里我们不再谈微软的JScript，一方面写本文时我没有找到详尽的介绍JScript的资料，另一方面JScript的应用现在不常见。

JavaScript是个什么样子，取决于它初始应用于哪里，它是作为浏览器的脚本出现，主要用途是解决网页中的用户交互。页面中的用户交互行为会让页面中的DOM元素产生变化，比如用户输入信息后的反馈提示等等。JavaScript在浏览器环境中操作DOM，为避免复杂的同步问题，决定了它采用单线程。如果同时有多个线程，有的在DOM节点上添加内容，有的修改了整个节点，甚至有的删除了整个节点，这个时候很难判断到底采用哪个线程的结果。

JavaScript最大的特点就是单线程，在浏览器环境中中是，在非浏览器环境中同样也是。单线程也就意味着JavaScript在同一时间只能进行一项任务，如果有多项任务的话，需要对任务进行排队，完成一个才能继续下一个。

不同的浏览器、不同的引擎、不同的执行环境，执行JavaScript的细节会有差异，但是不变的是单线程和队列。



## 运行过程   // 预编译期（预解析期）和执行期

在浏览器环境中，JavaScript引擎按 script 标签代码块从上到下的顺序加载并立即解释执行。

我们在这里不探究引擎的详尽解释执行细节，比如词法分析、语法分析以及语法树的构造等等，只说它解释执行过程中非常重要的两个时期预编译期（预解析期）和执行期。理解这两个阶段十分有助于理解JavaScript中的一些“奇特”的现象。

在预编译期JavaScript会对var和function的声明在其所在作用域内进行提升，提升的位置相当于所在作用域开始位置。预编译期需要注意下面几个问题：

1. 预编译首先是全局预编译，函数体在未调用时不进行预编译
2. 只有var和function声明会提升
3. 注意是在所在作用域内提升，不会扩展到其他作用域
4. 预编译后顺序执行



## 为什么JavaScript是单线程？

JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。



## 任务队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行。

JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。




## JavaScript 是Unicode 字符串编写的

## 区分大小写的语言

注意： html 不区分大小写

## js 会忽略程序中标识之间的空格和换行，可以在代码中随意使用空格和换行。 

## js 预定义了很多全局变量和函数，

arguments		encodeURI		encodeURIComponent			decodeURI		decodeURIComponent

NaN 		Ininity		Number		RegExp		Array		Boolean			Object 		 	String			Date		Math		undefined 		Json		Function

isNaN		isFinite		parseFlote		parseInt		eval	

Error		SyntaxError		RangeRrror		 	ReferenceError 		URIError		 EvalError		TypeError	

			

## js 使用分号（；）将语句分隔开。 分号不是必须的，加不加都可以。但是有些会混淆的地方还是要加


					
## js 数据类型 分为两类

1. 原始类型 string number bool null undefined

2. 对象类型 object array function Date RegExp

特殊值 ：  null undefined , 无法拥有方法的值

注意： 如果函数用来初始化一个对象 （使用new运算符），我们称之为构造函数，每个构造函数定义了一个类 （class） 对象 

## 全局变量 ： 不在任何函数中声明的变量

## 在客户端js中，在其表示的浏览器窗口中window对象充当全局对象
