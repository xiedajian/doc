

npm文档： https://www.npmjs.com/package/exceljs
github： https://github.com/guyonroche/exceljs

# exceljs

1.操作和编写电子表格数据和样式到XLSX
2.读取电子表格数据和样式JSON




# 安装

```
npm install exceljs
```



# 创建 excel 文档

```
var Excel = require('exceljs');

// 生成一个文件 
var workbook = new Excel.Workbook();

// 添加一个 sheet 工作表
var sheet = workbook.addWorksheet('My Sheet');

// 设置 sheet 页的列信息
sheet.columns=[
    {header:'第一列',key:'id',width:10},
    {header:'第二列',key:'name',width:20},
    {header:'第三列',key:'age',width:10},
]

// sheet 表的数据格式也可以用sheet列信息的key写为json
var rows = [
    {id:3,name:'xiedajian3'},       // 格式1：json格式
    [4,'xiedajian4',22],            // 格式2：数组格式
]

// 设置行数据
sheet.addRows(rows)                     // 写多行
sheet.addRow([5,'xiedajian5',25])      // 写单行

// 路径
var path = 'demo.xlsx'
workbook.xlsx.writeFile(path).then(()=>{console.log(`生成excel成功： ${path}`)})
```


## 设置

```
var Excel = require('exceljs');

// 生成一个文件 
var workbook = new Excel.Workbook();

// 作者
workbook.creator = 'Me';
// 上一次保存者
workbook.lastModifiedBy = 'Her';
// 创建内容的事件
workbook.created = new Date(1985, 8, 30);
// 最后一次保存的日期
workbook.modified = new Date();
// 最后一次打印的事件
workbook.lastPrinted = new Date(2016, 9, 27);
//  将工作簿日期设置为1904日期系统
workbook.properties.date1904 = true;

// 视图用于控制Excel如何显示工作表
workbook.views = [
    {
      x: 0, y: 0, width: 10000, height: 20000,
      firstSheet: 0, activeTab: 1, visibility: 'visible'
    }
]
```

更详细的设置参考文档




