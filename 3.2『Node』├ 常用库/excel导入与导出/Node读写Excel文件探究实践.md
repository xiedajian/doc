
[原文](https://aotu.io/notes/2016/04/07/node-excel/)


# Node读写Excel文件探究实践

本文介绍用 Node.js 中的依赖库来处理 Excel 文件，深入分析对比常见npm库处理Excel 文件存在的优缺点，主要阐述用js-xlsx、excel-export 库来处理 Excel 文件。


# 支持读写Excel的node.js模块
通过npm搜索，支持读写excel文件的模块有很多，但是都各有忧缺点，有些仅支持xls/xlsx的一种格式，有些仅支持读取数据，有些仅支持导出文件，有些需要依赖python解析。常见的npm依赖模块如下：

js-xlsx: 目前 Github 上 star 数量最多的处理 Excel 的库，支持解析多种格式表格XLSX / XLSM / XLSB / XLS / CSV，解析采用纯js实现，写入需要依赖nodejs或者FileSaver.js实现生成写入Excel，可以生成子表Excel，功能强大，但上手难度稍大。不提供基础设置Excel表格api例单元格宽度，文档有些乱，不适合快速上手；
node-xlsx: 基于Node.js解析excel文件数据及生成excel文件，仅支持xlsx格式文件；
excel-parser: 基于Node.js解析excel文件数据，支持xls及xlsx格式文件，需要依赖python，太重不太实用；
excel-export : 基于Node.js将数据生成导出excel文件，生成文件格式为xlsx，可以设置单元格宽度，API容易上手，无法生成worksheet字表，比较单一，基本功能可以基本满足；
node-xlrd: 基于node.js从excel文件中提取数据，仅支持xls格式文件,不支持xlsx,有点过时，常用的都是XLSX 格式。