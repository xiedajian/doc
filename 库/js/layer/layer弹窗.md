

# layer

layer是一款近年来备受青睐的web弹层组件

还有layer mobile供移动端使用

官网： http://layer.layui.com/


> 事实上layer提供的丰富的接口支撑，已经足够让你的弹层变得千变万化



## 使用

【注意事项】
一、使用时，请把文件夹layer整个放置在您站点的任何一个目录，只需引入layer.js即可，除jQuery外，其它文件无需再引入。
二、如果您的js引入是通过合并处理或者您不想采用layer自动获取的绝对路径，您可以通过layer.config()来配置（详见官网API页）
三、jquery需1.8+
四、更多使用说明与演示，请参见layer官网。
五、使用时请务必保留来源，请勿用于违反我国法律法规的web平台。
六、layer遵循MIT开源协议，将永久性提供无偿服务。


核心方法：
- layer.open( options )			// 原始核心方法，使用哪种方式创建层，都是走layer.open()
- layer.close(index) 			// 关闭特定层
- layer.closeAll(type) 			// 关闭所有层
- layer.style(index, cssStyle)	// 重新定义层的样式
- layer.title(title, index)		// 改变层的标题

其他内置层：
- layer.prompt(options, yes) 	// 输入层
- layer.tab(options) 			// tab层
- layer.photos(options) 		// 相册层




# layer mobile

官网： http://layer.layui.com/mobile/

文档： http://layer.layui.com/mobile/api.html

layer mobile是为移动设备（手机、平板等webkit内核浏览器/webview）量身定做的弹层UI。

由于是采用原生 JavaScript编写，所有并不依赖任何第三方库。

layer mobile完全独立于PC版的layer，您需要按照场景选择使用。

layer mobile正致力于成为您WebApp开发过程中弹出交互的不二选择。


#### layer mobile 使用

核心方法

- layer.open( options )		// 弹窗

- layer.close( index )		// 用于关闭特定层，index为该特定层的索引

- layer.closeAll()			// 关闭页面所有layer的层


弹窗参数 options 查看文档


