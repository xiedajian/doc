
# 宿主环境：浏览器

js作为脚本语言，必须依赖宿主环境运行，大多数情况运行在浏览器。

浏览器暴露的API供js脚本使用

不同的浏览器存在兼容问题


# BOM(浏览器对象模型)

浏览器对象模型（Browser Object Model ）

浏览器对象模型 使 JavaScript 有能力与浏览器"对话"。

- window对象                            // 表示浏览器窗口
- window.screen 对象                    // 用户屏幕的信息
- window.location 对象                  // 当前页面的地址 
- window.history 对象                   // 对象包含浏览器的历史
- window.navigator 对象                 // 包含有关访问者浏览器的信息。
- cookie 对象
- window.alert("sometext") 弹窗对象     // 三种消息框：警告框、确认框、提示框
- window.setInterval() 计时事件         // 计时事件


# DOM (文档对象模型)

文档对象模型（Document Object Model）

当网页被加载时，浏览器会创建页面的文档对象模型

HTML DOM 模型被构造为对象的树：

通过可编程的对象模型，JavaScript 获得了足够的能力来创建动态的 HTML

- JavaScript 能够改变页面中的所有 HTML 元素
- JavaScript 能够改变页面中的所有 HTML 属性
- JavaScript 能够改变页面中的所有 CSS 样式
- JavaScript 能够对页面中的所有事件做出反应

