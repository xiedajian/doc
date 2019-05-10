[github](https://github.com/Ziv-Barber/officegen)
[完整文档](https://github.com/Ziv-Barber/officegen/blob/master/manual/README.md)


NodeJS 使用 officegen 生成 Excel（.xlsx），PowerPoint（.pptx）和Word（.docx）文档

# officegen 

officegen 模块可以为Microsoft Office 2007及更高版本生成Office Open XML文件。
此模块不依赖于任何框架，您不需要安装Microsoft Office，因此您可以将它用于任何类型的 JavaScript 应用程序。
输出也是流而不是文件，不依赖于任何输出工具。
此模块应适用于支持Node.js 0.10或更高版本的任何环境，包括Linux，OSX和Windows。


此模块生成Excel（.xlsx），PowerPoint（.pptx）和Word（.docx）文档。
 
Officegen还支持带有嵌入数据的PowerPoint本机图表对象。

```
$ npm install officegen
```


# 用法

Microsoft Word基本用法示例：
```
const officegen = require('officegen')
const fs = require('fs')
const path = require('path')

// Create an empty Word object:
let docx = officegen('docx')

// 监听文档完成
docx.on('finalize', function(written) {
  console.log(
    'Finish to create a Microsoft Word document.'
  )
})

// 监听文档错误
docx.on('error', function(err) {
  console.log(err)
})

// 页眉，非必须
let header = docx.getHeader ().createP ({align:('center')});
header.addText ( '页眉',{font_size:8,font_face:'SimSun' });
header.addHorizontalLine(); // 添加水平线

// 创建新段落
let pObj = docx.createP()
pObj.addText('Simple')
pObj.addText(' with color', { color: '000088' })
pObj.addText(' and back color.', { color: '00ffff', back: '000088' })

pObj = docx.createP()
pObj.addText('Since ')
pObj.addText('officegen 0.2.12', {
  back: '00ffff',
  shdType: 'pct12',
  shdColor: 'ff0000'
}) // 背景
pObj.addText(' you can do ')
pObj.addText('more cool ', { highlight: true }) // 高亮
pObj.addText('stuff!', { highlight: 'darkGreen' }) // 设置高亮的颜色


pObj = docx.createP()
pObj.addText('Even add ')
pObj.addText('external link', { link: 'https://github.com' }) // 添加外链
pObj.addText('!')

pObj = docx.createP()
pObj.addText('Bold + underline', { bold: true, underline: true }) // 下划线

pObj = docx.createP({ align: 'center' }) // 居中对齐的段落
pObj.addText('Center this text', {
  border: 'dotted',
  borderSize: 12,
  borderColor: '88CCFF'
}) // 设置边框

pObj = docx.createP()
pObj.options.align = 'right' // 右对齐
pObj.addText('Align this text to the right.')

pObj = docx.createP()
pObj.addText('Those two lines are in the same paragraph,')
pObj.addLineBreak() // 添加换行符
pObj.addText('but they are separated by a line break.')

docx.putPageBreak() // 添加分页符：下一页

pObj = docx.createP()
pObj.addText('Fonts face only.', { font_face: 'Arial' })
pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 }) // 设置字体，大小

docx.putPageBreak()

pObj = docx.createP()

// 添加图片
pObj.addImage('some-image.png')
pObj.addImage ( path.resolve(__dirname, 'myFile.png' ) );
pObj.addImage ( path.resolve(__dirname, 'myFile.png', { cx: 300, cy: 200 } ) );

// 表格数据
var table = [
	// 单行
    [
		// 单个单元格
        {
            val: 'No.', // 内容
			// 配置
            opts: {
                cellColWidth: 4261,
                b: true,
                sz: '48',
                shd: {
                    fill: '7F7F7F',
                    themeFill: 'text1',
                    themeFillTint: '80'
                },
                fontFamily: 'Avenir Book'
            }
        },
        {
            val: 'Title1',
            opts: {
                b: true,
                color: 'A00000',
                align: 'right',
                shd: {
                    fill: '92CDDC',
                    themeFill: 'text1',
                    themeFillTint: '80'
                }
            }
        },
        {
            val: 'Title2',
            opts: {
                align: 'center',
                cellColWidth: 42,
                b: true,
                sz: '48',
                shd: {
                    fill: '92CDDC',
                    themeFill: 'text1',
                    themeFillTint: '80'
                }
            }
        }
    ],
	// 单行的简单格式
    [1, 'All grown-ups were once children', ''],
    [2, 'there is no harm in putting off a piece of work until another day.', ''],
]

// 表格样式
var tableStyle = {
    tableColWidth: 4261,
    tableSize: 24,
    tableColor: 'ada',
    tableAlign: 'left',
    tableFontFamily: 'Comic Sans MS'
}

// 创建表格
pObj = docx.createTable(table, tableStyle)


// 创建Word文件
let out = fs.createWriteStream('example.docx')

out.on('error', function(err) {
  console.log(err)
})

// 异步调用以生成输出文件
docx.generate(out)
```

[完整的生成word的API](https://github.com/Ziv-Barber/officegen/blob/master/manual/README-docx.md)


# officegen 生成 word 时的缺陷

可以生成word，可以插入图片，可以插入表格，但是表格单元格中插入图片无法实现

解决方法：在officegen 基础上的扩展库：officegen-complex-table
 
 
 
 # officegen-complex-table

在officegen 基础上的扩展库，可以实现在word中表格内插入图片
```
npm install officegen-complex-table
```

核心代码：
```
const officegen = require('officegen-complex-table')
let docx = officegen('docx')

  var table = [
            [
                {
                    "val": "编号",
                    "opts": {
                        "align": "center",
                        "vAlign": "center",
                        "cellColWidth": 4261,
                        "b": true,
                        "sz": "24",
                        "shd": {
                            "fill": "7F7F7F",
                            "themeFill": "text1",
                            "themeFillTint": "80"
                        },
                        "fontFamily": "Avenir Book"
                    }
                },
                {
                    "val": "截图",
                    "opts": {
                        "align": "center",
                        "vAlign": "center",
                        "cellColWidth": 42,
                        "b": true,
                        "sz": "24",
                        "shd": {
                            "fill": "92CDDC",
                            "themeFill": "text1",
                            "themeFillTint": "80"
                        }
                    }
                },
            ],
			[
				1,
				// 插入图片，记得得加 []包裹
                [{
                    "type": "image",
                    "path":  path.resolve(__dirname, './image1.png') ,
                    "opts": {
                        "cx": 72,
                        "cy": 72
                    }
                }],
			]
        ]
		
	docx.createTable(table, tableStyle);
```