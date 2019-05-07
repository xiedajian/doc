[github](https://github.com/evidenceprime/html-docx-js)


# html-docx-js

浏览器端，Node端都可以用的库

把html转为word文档


# 使用

要生成DOCX，只需将HTML文档（作为字符串）传递给asBlob方法以接收Blob（或Buffer）包含输出文件。

```
const htmlDocx = require('html-docx-js')

var converted = htmlDocx.asBlob(content);
saveAs(converted, 'test.docx');
```