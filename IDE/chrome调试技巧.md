
文章链接： https://segmentfault.com/a/1190000016256731


# console

## 基本输出：

console.log()       // 日志
console.debug()     // 调试
console.info()      // 信息
console.warn()      // 警告
console.error()     // 错误
console.clear()     // 清空

*上面的error和throw出的error不一样，前者只是输出错误信息，无法捕获，不会冒泡，更不会终止程序*

## 格式化输出：

console.log("%s年",2016)            // %s 表示字符串
console.log("%d年%d月",2016,11)     // %d 表示整数
console.log("%f",3.1415926)         // %f 表示浮点数
console.log("%o",console)           // %o 表示对象
console.log("%c自定义样式","font-size:30px;color:red")
console.log("%c我是%c自定义样式","font-size:20px;color:red","font-size:30px;color:green")


## DOM 输出  console.dirxml

console.dirxml(document.getElementsByTagName("p"))


## 对象输出 console.dir

console.dir({name:'xiedajian',age:20})

## 表格输出  console.table

```js
var stu=[
    {name:'xiedajian1',age:20},
    {name:'xiedajian2',age:20},
    {name:'xiedajian3',age:20},
]
```
对于多个对象的集合，可以使用console.table 打印表格的形式，更加直观

console.table(stu);


## 成组输出 console.group

console.group('分组输出')
console.log('组员1')
console.log('组员2')
console.log('组员3')
console.groupEnd('end')



## 函数计数和跟踪 console.count   console.trance

下满是一个斐波那契数列的案例
```js
function f(n){
    if(n ==0 )return
    console.count('调用次数');      // 放到函数里，输出执行次数
    console.trance();               // 显示函数的调用轨迹（访问调用栈）
    
    var a = arguments[1] || 1;
    var b = arguments[2] || 1;
    console.log('f='+a);
    [a, b] = [b, a+b]
    f(--n, a, b)
}
f(6)
```


## 计时   console.time

```js
console.time()      // 计时开始
f(100)
console.timeEnd()   // 计时结束
```


## 断言 assert

assert 第一个表达式为 true 什么也不发生，为 false 程序终止并报错

```js
console.assert(true,'我错了')
console.assert(false,'我真的错了')
```


## 性能分析 console.profile

```
console.profile()      
f(100)
console.profileEnd()   
```
会以图表的形式展示性能分析





# 断点调试   debugger

单步调试， 就是点一下，执行依据程序，并且可以查看当前作用域的所有变量和值

debugger 就是告诉程序在哪里定下来进行单步调试，俗称断点

chrome 调试会在遇到 debugger 的时候停下，调试面板右侧有各个按钮

- pause/resume      // 暂停/恢复  （程序执行到下一个断点停止）
- 跳到下一行        
- 进入当前函数
- 跳出当前函数
- 关闭/开启所有断点 （不会取消
- 异常情况自动断点设置

其实右侧还有很多强大的功能

- Watch：Watch表达式
- Call Stack: 栈中变量的调用，这里是递归调用，肯定是在内存栈部分调用。
- Scope：当前作用域变量观察。
- BreakPoints：当前断点变量观察。
- XHR BreakPoints：面向Ajax，专为异步而生的断点调试功能。
- DOM BreakPoints：DOM断点



# chrome中的调试技巧

- 如果你想调试f函数，用debug(f)语句可以增加这种断点。
- Sources标签页左侧面板上有一个代码片段（Snippet）子标签页，可用于保存代码片段，帮你调试代码。
- 可以用Chrome开发者工具Sources标签页中的格式化按钮（Pretty Print Button）格式化压缩后的代码。
- 在Network面板，选择一个资源文件，右键Copy Response可快速复制响应内容。
- 利用媒体查询，这个主要是在Device Mode调节不同的分辨率显示。
- 选择Elements，按 Esc > Emulation > Sensors进行传感器模拟。
- 点击渐入效果样式图标（紫色图标），可以预览动画效果，并可对相应的贝塞尔曲线(cubic-bezier)进行调节动画效果。
- 在Source中按住Alt键并拖动鼠标进行多列内容选择。
- Elements面板右键执行DOM元素节点，选择Force Element State或者点击右侧Toggle Element State图标可以出发伪类。
- Network面板中选择一张图片，在右侧图片上鼠标右键选择copy it as a Data URI,就可以获取图片的Data URL (base64编码)。
- 通过按住Ctrl键可以添加多个编辑光标，同时对多处进行编辑。按下Ctrl + U可以撤销编辑。
- Elements面板右侧的Style编辑器中，点击颜色十六进制编码前的小色块，会弹出一个调色板。
- 按下Alt键并且鼠标双击选择DOM元素前面的箭头，就会展开该DOM元素下的所有字节点元素.

快捷键：

- 快速定位到行：快捷键Ctrl+O(Mac:CMD+O),输入：行号:列号 来进行定位
- 元素搜索：快捷键Ctrl+F(Mac:CMD+F),试试在搜索栏输入ID选择符或者类选择符就可以定位到元素啦









