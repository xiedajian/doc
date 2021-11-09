


Node环境变量

### process

process到底是个什么东西

文档：http://nodejs.cn/api/process.html


官方解释：process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()

process（进程）其实就是存在nodejs中的一个全局变量



### process.env

这是啥?

官方: process.env属性返回一个包含用户环境信息的对象。

文档：http://nodejs.cn/api/process.html#process_process_env

噢噢噢，原来着个属性能返回项目运行所在环境的一些信息。


例如这样的对象:

```
	{
	  TERM: 'xterm-256color',
	  SHELL: '/usr/local/bin/bash',
	  USER: 'maciej',
	  PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
	  PWD: '/Users/maciej',
	  EDITOR: 'vim',
	  SHLVL: '1',
	  HOME: '/Users/maciej',
	  LOGNAME: 'maciej',
	  _: '/usr/local/bin/node'
	}

```

可以添加修改删除 process.env 属性

```
	process.env.test = null;

	console.log( process.env.test );		// => null

	process.env.test = 'hello';

	console.log( process.env.test );		// => 'hello'

	delete process.env.test;

	console.log( process.env.test );		// => undefined
```

在Windows系统下，环境变量是不区分大小写的

```

	process.env.TEST = 1;
	console.log(process.env.test);  // => 1

```


## 有啥用呢？

能根据不同的环境，做一些配置上的处理。

比如开启 sourceMap，后端接口的域名切换等等




