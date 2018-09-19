

# document：

document.body // 获取body元素中内容
document.charset //获取当前文档的字符编码，可以设置
document.defaultView //显示window对象
document.designMode // 设置为on 整个文档可编辑， contenteditable 可以设置单个元素可编辑
document.domain // 当前文档所在服务器的主机名
document.embeds // 获取文档中embed元素组成的类数组对象
document.forms // 获取文档中form元素的类数组
document.head // 获取head元素
document.images // 获取图片 组成的数组
document.lastModified // 定义当前文档最近修改的时间和日期
document.links //获取所有的超链接
document.location // 获取本地信息
document.readyState // 如果文档仍在加载中，返回 loading ，加载完成返回 complete，当它的属性值为complete时候，浏览器会触发 readystatechange事件
document.scripts // 获取script组成的类数组
document.styleSheets // 获取样式表的集合
document.title //获取title的内容
document.URL // 获取当前文档加载的URL



# document方法：

document.createElement() // 根据指定标签名 创建并返回一个新的空白节点
document.createTextNode() // 创建一个新的text节点
document.getElementById() // 查找id的元素节点
document.getElementsByClassName() // 查找class的元素节点的集合
document.getElementsByName() //查找有name值的 元素
document.getElementsByTagName() // 查找标签名的元素合集
document.open() // 打开新的页面
document.close() // 关闭open方法打开的文档流
document.querySelector() //获取css选择器选中的元素
document.querySelectorAll() //获取css选择器选中的多个元素
document.write() //将参数追加到文档中
document.writeln() //将参数输出文档中添加换行