

官方文档： [https://docxtemplater.com/](https://docxtemplater.com/)
npm: [https://www.npmjs.com/package/docxtemplater](https://www.npmjs.com/package/docxtemplater)
github: [https://github.com/open-xml-templating/docxtemplater](https://github.com/open-xml-templating/docxtemplater)




# docxtemplater

docxtemplater是一个邮件合并工具，以编程方式使用并处理条件，循环，并可以扩展为插入任何内容（表，html，图像）。

docxtemplater使用JSON（Javascript对象）作为数据输入，因此它也可以从其他语言轻松使用。它处理docx以及pptx模板。

它的工作方式与模板引擎相同。

许多解决方案，如docx.js，docx4j，python-docx 都可以生成docx，但是它们需要你编写特定的代码来创建标题，图像......

相比之下，docxtemplater基于标记的概念，并且每种类型的标记向用户编写模板的功能。


> 浏览器，Nodejs 环境通用


# 安装

```
npm install --save docxtemplater pizzip
```


# 生成文档

加入有这样一个模板文件 input.docx
```
时间	{BY}年{BM}月{BD}日{BH}时{BMin}分至{EY}年{EM}月{ED}日{EH}时{EMin}分
地点	{ReportPosition}                                                             
询问人(签名)			、			工作单位{OfficeName}   
```

利用模板文件生成新的 docx 文件
```
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve(__dirname, "input.docx"),
    "binary"
);

const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});

// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
doc.render({
    first_name: "John",
    last_name: "Doe",
    phone: "0652455478",
    description: "New Website",
});

const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
});

// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
```


## 浏览器版本
```
<html>
    <body>
        <button onclick="generate()">Generate document</button>
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.32.5/docxtemplater.js"></script>
    <script src="https://unpkg.com/pizzip@3.1.3/dist/pizzip.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"></script>
    <script src="https://unpkg.com/pizzip@3.1.3/dist/pizzip-utils.js"></script>
    <!--
    Mandatory in IE 6, 7, 8 and 9.
    -->
    <!--[if IE]>
        <script
            type="text/javascript"
            src="https://unpkg.com/pizzip@3.1.3/dist/pizzip-utils-ie.js"
        ></script>
    <![endif]-->
    <script>
        function loadFile(url, callback) {
            PizZipUtils.getBinaryContent(url, callback);
        }
        window.generate = function generate() {
            loadFile(
                "https://docxtemplater.com/tag-example.docx",
                function (error, content) {
                    if (error) {
                        throw error;
                    }
                    var zip = new PizZip(content);
                    var doc = new window.docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });

                    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                    doc.render({
                        first_name: "John",
                        last_name: "Doe",
                        phone: "0652455478",
                        description: "New Website",
                    });

                    var blob = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        // compression: DEFLATE adds a compression step.
                        // For a 50MB output document, expect 500ms additional CPU time
                        compression: "DEFLATE",
                    });
                    // Output the document using Data-URI
                    saveAs(blob, "output.docx");
                }
            );
        };
    </script>
</html>

```