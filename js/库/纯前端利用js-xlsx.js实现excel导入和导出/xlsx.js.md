[npm](https://www.npmjs.com/package/xlsx)
[github](https://github.com/SheetJS/js-xlsx)
[教程参考](https://www.jianshu.com/p/74d405940305)



# js-xlsx

目前 Github 上 star 数量最多的处理 Excel 的库，支持解析多种格式表格XLSX / XLSM / XLSB / XLS / CSV，解析采用纯js实现，写入需要依赖nodejs或者FileSaver.js实现生成写入Excel，可以生成子表Excel，功能强大，但上手难度稍大。

不提供基础设置Excel表格api例单元格宽度，文档有些乱，不适合快速上手；

```
$ npm install xlsx
```


# 一些概念

在使用这个库之前，先介绍库中的一些概念。


> workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
> worksheet 对象，指的是 Excel 文档中的表。我们知道一份 Excel 文档中可以包含很多张表，而每张表对应的就是 worksheet 对象。
> cell 对象，指的就是 worksheet 中的单元格，一个单元格就是一个 cell 对象。


它们的关系如下：
```
// workbook
{
    SheetNames: ['sheet1', 'sheet2'],
    Sheets: {
        // worksheet
        'sheet1': {
            // cell
            'A1': { ... },
            // cell
            'A2': { ... },
            ...
        },
        // worksheet
        'sheet2': {
            // cell
            'A1': { ... },
            // cell
            'A2': { ... },
            ...
        }
    }
}
```

# 基本用法

1.用 XLSX.read 读取获取到的 Excel 数据，返回 workbook
2.用 XLSX.readFile 打开 Excel 文件，返回 workbook
3.用 workbook.SheetNames 获取表名
4.用 workbook.Sheets[xxx] 通过表名获取表格
5.用 worksheet[address]操作单元格
6.用XLSX.utils.sheet_to_json针对单个表获取表格数据转换为json格式
7.用XLSX.writeFile(wb, 'output.xlsx')生成新的 Excel 文件


# 提供的快捷的数据转化

用于生成excel文档
```
XLSX.utils.aoa_to_sheet() 		数组转excel表
XLSX.utils.json_to_sheet() 		json数据转excel表
XLSX.utils.table_to_sheet() 	表格Dom转excel表
XLSX.utils.sheet_add_aoa() 		已有的excel表添加数组数据
XLSX.utils.sheet_add_json() 	已有的excel表添加数组数据
```

用于读取excel文档
```
XLSX.utils.sheet_to_json() 		excel表转数组
XLSX.utils.sheet_to_csv() 		excel表转json数据
XLSX.utils.sheet_to_txt() 		excel表转txt
XLSX.utils.sheet_to_html() 		excel表转html
```

# 封装好的两个方法
```
import XLSX from 'xlsx';
// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
export function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }); // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}

// 浏览器打开下载弹窗
export function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

```

使用
```
var worksheet = XLSX.utils.aoa_to_sheet([
  "SheetJS".split(""),
  [1,2,3,4,5,6,7],
  [2,3,4,5,6,7,8]
]);
  openDownloadDialog(sheet2blob(worksheet),`数据列表.xlsx`);
```


# 案例

## 1.前端 dom 表格导出 excel 文档

```

<table id="mytable"><tr>....</tr></table>

<script>
let sheet = XLSX.utils.table_to_sheet(document.getElementById('mytable'));//将一个table对象转换成一个sheet对象
  openDownloadDialog(sheet2blob(sheet),`${this.original_form.name}反馈数据列表.xlsx`);
</script>
```









# 案例理解： 读取本地文件分析

```
<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js"></script>
    </head>

    <body>
        <input type="file"onchange="importf(this)" />
        <div id="demo"></div>
        <script>
            /*
            FileReader共有4种读取方法：
            1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
            2.readAsBinaryString(file)：将文件读取为二进制字符串
            3.readAsDataURL(file)：将文件读取为Data URL
            4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
                         */
            var wb;//读取完成的数据
            var rABS = false; //是否将文件读取为二进制字符串

            function importf(obj) {//导入
                if(!obj.files) {
                    return;
                }
                var f = obj.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    if(rABS) {
                        wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = XLSX.read(data, {
                            type: 'binary'
                        });
                    }
                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
                    document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
                };
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            }

            function fixdata(data) { //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            }

        </script>
    </body>

</html>
```






# 案例理解

```
<!DOCTYPE html>
<html>
 
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="/js-xlsx.js"></script>
</head>
 
<body>
    <button onclick="downloadExl(jsono)">导出</button>
    <!--
            以下a标签不需要内容
        -->
    <a href="" download="这里是下载的文件名.xlsx" id="hf"></a>
    <script>
        var jsono = [{ //测试数据
            "保质期临期预警(天)": "adventLifecycle",
            "商品标题": "title",
            "建议零售价": "defaultPrice",
            "高(cm)": "height",
            "商品描述": "Description",
            "保质期禁售(天)": "lockupLifecycle",
            "商品名称": "skuName",
            "商品简介": "brief",
            "宽(cm)": "width",
            "阿达": "asdz",
            "货号": "goodsNo",
            "商品条码": "skuNo",
            "商品品牌": "brand",
            "净容积(cm^3)": "netVolume",
            "是否保质期管理": "isShelfLifeMgmt",
            "是否串号管理": "isSNMgmt",
            "商品颜色": "color",
            "尺码": "size",
            "是否批次管理": "isBatchMgmt",
            "商品编号": "skuCode",
            "商品简称": "shortName",
            "毛重(g)": "grossWeight",
            "长(cm)": "length",
            "英文名称": "englishName",
            "净重(g)": "netWeight",
            "商品分类": "categoryId",
            "这里超过了": 1111.0,
            "保质期(天)": "expDate"
        }];
        var tmpDown; //导出的二进制对象
        function downloadExl(json, type) {
            var tmpdata = json[0];
            json.unshift({});
            var keyMap = []; //获取keys
            for (var k in tmpdata) {
                keyMap.push(k);
                json[0][k] = k;
            }
          var tmpdata = [];//用来保存转换好的json 
                json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                    v: v[k],
                    position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
                }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
                    v: v.v
                });
                var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
                var tmpWB = {
                    SheetNames: ['mySheet'], //保存的表标题
                    Sheets: {
                        'mySheet': Object.assign({},
                            tmpdata, //内容
                            {
                                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                            })
                    }
                };
                tmpDown = new Blob([s2ab(XLSX.write(tmpWB, 
                    {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
                    ))], {
                    type: ""
                }); //创建二进制对象写入转换好的字节流
            var href = URL.createObjectURL(tmpDown); //创建对象超链接
            document.getElementById("hf").href = href; //绑定a标签
            document.getElementById("hf").click(); //模拟点击实现下载
            setTimeout(function() { //延时释放
                URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
            }, 100);
        }
 
        function s2ab(s) { //字符串转字符流
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
         // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
        function getCharCol(n) {
            let temCol = '',
            s = '',
            m = 0
            while (n > 0) {
                m = n % 26 + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        }
    </script>
</body>
 
</html>

```