

[使用js前端实现word、excel、pdf、ppt 在线预览](https://blog.csdn.net/Gefangenes/article/details/131137913)


## word(docx)

相关方案 docx-preview、mammoth

#### docx-preview

纯前端的JavaScript库，它的优点是可以实现对 .docx 的文件进行在线预览，但是缺点是 不支持.doc (划重点)。

[docxjs](https://github.com/VolodymyrBaydalka/docxjs)

案例： [案例](https://volodymyrbaydalka.github.io/docxjs/)



### Mammoth

Mammoth 原理是将 .docx 文档并将其转换为 HTML。 注意Mammoth 转换过程中复杂样式被忽，居中、首行缩进等，此外同样也只能转换.docx文档。

github地址：https://github.com/mwilliamson/mammoth.js

安装：

npm install mammoth


### vue-office

支持多种文件(docx、excel、pdf)预览的vue组件库

[github](https://github.com/501351981/vue-office)