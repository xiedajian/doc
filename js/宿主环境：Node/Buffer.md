

# BUffer：

理解二进制文件

Node中需要处理网络协议、操作数据库、处理图片、文件上传等，还需要处理大量二进制数据，自带的字符串远不能满足这些要求，因此Buffer应运而生。

js善于处理字符串，最初用来处理html，不善于处理二进制文件，但是要处理数据库通讯，文件上传，图片操作等，只用字符串会相当困难。

为了使这类二进制数据处理任务变得更加容易，node实现了一个二进制缓冲区Buffer，缓冲区的长度已字节为计量单位。

创建一个二进制缓冲区Buffer：

var buf=new Buffer('hello world');			//默认使用utf8编码格式的字符串创建
var buf=new Buffer('hello world','base64');		//使用base64创建

如果缓冲区没有具体的内容初始化，可以先指定容量大小创建

```
var buf=new Buffer(1024);  //创建一个1024字节容量的buffer

var buf=new Buffer(100);
console.log(buf.length);  //->100  数组
//访问与赋值
for（var i =0 ;i <buf.length ;i++）{
buf[i] =i;
}


var buf=new Buffer('this is the content of my buffer');
var samllerBuf=buf.slice(8,19);  //buffer中的一部分
console.log(smallerBuf.toString());   //-> 'the content'
```

注意：用buf.slice(8,19)切分出去的buff，不会重新分配新的内存，是对父缓冲区局部的引用，父缓冲区变化，子缓冲区会跟着变化。如果只是想copy区别内容创建新的buffer，应该用copy方法，

```
	var buf=new Buffer('this is the content of my buffer');
	var smallerBuf=new Buffer(11);
	buf.copy( samllerBuf , 0 , 8 , 19);	//参数2表示从smallBuf[0]位置开始写入
	console.log(smallerBuf.toString());    //-> 'the content'

	 
	Buffer对象可以和字符串相互转换（缓冲区解码），支持的编码类型如下：
	ASCII、UTF-8、UTF-16LE/UCS-2、Base64、Binary、Hex
	//默认utf8编码
	var buf=new Buffer('name');
	var name=buf.toString();
	//Base64位编码
	var buf=new Buffer('name' , 'base64');
	var name=buf.toString( 'base64' );
	//利用buffer，把utf8编码字符串 换成base64编码字符串
	var buf=new Buffer('name');
	var base64String=buf.toString( ‘base64 ’ );
```

实际用途:
1.用fs模块读取文件内容时，返回的就是一个Buffer：
fs.readFile('filename', function (err, buf) {
  // <Buffer 2f 2a 2a 0a 20 2a 20 53 75 ... >
});
2.使用net或者 http 模块处理网络数据是，data事件的参数也是一个Buffer
var bufs = [];
conn.on('data', function (buf) {
  bufs.push(buf);
});
conn.on('end', function () {
  // 接收数据结束后，拼接所有收到的Buffer对象
  var buf = Buffer.concat(bufs);
});
3.还可以用Buffer.toString()来转换 base64位 字符
console.log(new Buffer('hello, world!').toString('base64'));
// 转换成base64字符串：aGVsbG8sIHdvcmxkIQ==

console.log(new Buffer('aGVsbG8sIHdvcmxkIQ==', 'base64').toString());
// 还原base64字符串：hello, world!

console.log(new Buffer('hello, world!').toString('hex'));
// 转换成十六进制字符串：68656c6c6f2c20776f726c6421

console.log(new Buffer('68656c6c6f2c20776f726c6421', 'hex').toString());
// 还原十六进制字符串：hello, world!
