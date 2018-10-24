
npm: [https://www.npmjs.com/package/docxtemplater](https://www.npmjs.com/package/docxtemplater)
github: [https://github.com/open-xml-templating/docxtemplater](https://github.com/open-xml-templating/docxtemplater)
官方文档： [https://docxtemplater.readthedocs.io/en/latest/#](https://docxtemplater.readthedocs.io/en/latest/#)



# docxtemplater

docxtemplater是一个邮件合并工具，以编程方式使用并处理条件，循环，并可以扩展为插入任何内容（表，html，图像）。

docxtemplater使用JSON（Javascript对象）作为数据输入，因此它也可以从其他语言轻松使用。它处理docx以及pptx模板。

它的工作方式与模板引擎相同。

许多解决方案，如docx.js，docx4j，python-docx 都可以生成docx，但是它们需要你编写特定的代码来创建标题，图像......

相比之下，docxtemplater基于标记的概念，并且每种类型的标记向用户编写模板的功能。



# 安装

```
npm install docxtemplater
npm install jszip@2
npm install jszip-utils 		# only for the browser (webpack)
```

> szip版本2很重要！它不适用于jszip版本3

> jszip-utils（仅适用于浏览器）未随jszip一起安装，必须单独安装



# 生成文档

加入有这样一个模板文件 input.docx
```
时间	{BY}年{BM}月{BD}日{BH}时{BMin}分至{EY}年{EM}月{ED}日{EH}时{EMin}分
地点	{ReportPosition}                                                             
询问人(签名)			、			工作单位{OfficeName}   
```

利用模板文件生成新的 docx 文件
```
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

//Load the docx file as a binary
var content = fs
    .readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');

var zip = new JSZip(content);

var doc = new Docxtemplater();
doc.loadZip(zip);

//set the templateVariables
doc.setData({
    first_name: 'John',
    last_name: 'Doe',
    phone: '0652455478',
    description: 'New Website'
});

try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
}
catch (error) {
    var e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
    }
    console.log(JSON.stringify({error: e}));
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    throw error;
}

var buf = doc.getZip()
             .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
```


## 浏览器版本
```
<html>
    <body>
        <button onclick="generate()">Generate document</button>
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.9.1/docxtemplater.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.1/jszip.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.js"></script>
    <!--
    Mandatory in IE 6, 7, 8 and 9.
    -->
    <!--[if IE]>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils-ie.js"></script>
    <![endif]-->
    <script>
    function loadFile(url,callback){
        JSZipUtils.getBinaryContent(url,callback);
    }
    function generate() {
        loadFile("https://docxtemplater.com/tag-example.docx",function(error,content){
            if (error) { throw error };
            var zip = new JSZip(content);
            var doc=new window.docxtemplater().loadZip(zip)
            doc.setData({
                first_name: 'John',
                last_name: 'Doe',
                phone: '0652455478',
                description: 'New Website'
            });
            try {
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({error: e}));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                throw error;
            }
            var out=doc.getZip().generate({
                type:"blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            }) //Output the document using Data-URI
            saveAs(out,"output.docx")
        })
    }
    </script>
</html>
```