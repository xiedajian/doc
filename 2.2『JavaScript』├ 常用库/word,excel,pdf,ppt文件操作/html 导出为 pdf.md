


[使用jsPDF 和jspdf-autotable 导出中文表格页面](https://www.cnblogs.com/lucas27/p/14794294.html)
[jspdf](https://www.npmjs.com/package/jspdf)
[jspdf扩展库jspdf-autotable](https://www.npmjs.com/package/jspdf-autotable)



### 把页面导出pdf我们有2种方式：

1.把页面变成图片，然后把图片弄成pdf
2.直接把html变成pdf

###  方式1：先转图片，再生成pdf （ html2canvas 和 jsPDF ）

jsPDF 库可以 js 生成 pdf， 但是页面不仅仅只有简单的元素，还会有图表，地图等。 所以先生成图片，再生成pdf。

> 因为是截图，所以会有放大图片不清晰

依赖
```
npm install html2canvas jsPDF

或者cdn
  <script src="https://cdn.bootcdn.net/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  // jspdf 挂在window上的全局变量为  jspdf = { jsPDF }
```


```js
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';

  const downloadPdf = () => {
    const printHtml = document.getElementById('myPage'); //myPage里面的内容会经过库处理变成图片
    html2canvas(printHtml).then((canvas) => {
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      // 一页pdf显示html页面生成的canvas高度;
      const pageHeight = contentWidth / 592.28 * 841.89;
      // 未生成pdf的html页面高度
      let leftHeight = contentHeight;
      // 页面偏移
      let position = 0;
      // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      const imgWidth = 595.28;
      const imgHeight = 592.28 / contentWidth * contentHeight;

      const pageData = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF('', 'pt', 'a4'); // 纵向方向p，单位pt|mm， 格式a4   // 如果是cdn的方式引入，应该是 new jspdf.jsPDF()

	  // 分页
      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          // 避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save('pdf的名字.pdf');
    });
  };

```

###  方式1：jsPDF 和 jspdf-autotable 

```
npm install jsPDF jspdf-autotable
```
清晰可见，打印出来效果很好。

坑：处理中文，因为默认不支持中文
解决导出中文不乱码问题，我们需要提供一个编译处理过的js字体文件，给jsPDF设置上字体，就可以了。

方法：
1.先去 [这里](https://rawgit.com/MrRio/jsPDF/master/fontconverter/fontconverter.html) 转换你需要的字体（只支持 .ttf格式的字体）
2. 在上面转换后你会得到一个js文件，打开文件我们只需要保留那很长的字符串，并且把它导出，其他代码可以注释掉。
const myFont ="那一堆超长字符串"；
export defalut myFont;
3. 使用时
doc.addFileToVFS("ok.ttf", myFont);// 前面.ttf随便写，后面就是那个超长字符串
doc.addFont("ok.ttf", "hahaFont", "normal"); //.ttf和上一行对应；定义的字体名字，后面要用到；默认normal

html部分
使用的是table标签，然后如果单元格内容多需要换行的使用
标签，这样到时导出的pdf才会换行，同时不需要再套p或div标签。不然页面上会空出很多。
```
<button onclick="downloadPdf">导出PDF</button>
<div id="myPage">
	xxxx的内容
	<table id="indexTable" border="1" cellPadding="10" cellspacing="0">
          <thead>
            <tr>
              <th style={{ width: '10%', textAlign: 'center' }}>类</th>
              <th style={{ width: '10%', textAlign: 'center' }}>指标</th>
            </tr>
          </thead>
          <tbody>
		  	<tr>
				<td>课堂适应学生<br>清晰一二</td>
				<td>四五六</td>
			</tr>
			<tr>
				<td>蒸馏水<br>水电费<br/>朗读一下</td>
				<td>临时冻结</td>
			</tr>
		  </tbody>
	</table>	  
</div>
```

js部分
```
import { jsPDF as JsPDF } from 'jspdf';
import 'jspdf-autotable';
import myFont from './myzt-normal';//引入字体js文件，解决中文乱码

const downloadPdf = () => {
    const doc = new JsPDF('p', 'pt'); // 获取实例
    const res = doc.autoTableHtmlToJson(document.getElementById('indexTable'));
    // 设置中文字体
    doc.addFileToVFS('ok.ttf', myFont);
    doc.addFont('ok.ttf', 'myFont', 'normal');
    doc.setFont('myFont');

    doc.autoTable({
      styles: {//设置表格的字体，不然表格中文也乱码
        fillColor: [255, 255, 255], font: 'myFont', textColor: [0, 0, 0], halign: 'left', fontSize: 12,
      },
      headStyles: { lineWidth: 1, halign: 'center' },
      columnStyles: {
        0: { valign: 'middle', cellWidth: 50 },
        1: { valign: 'middle', cellWidth: 50 },
        2: { valign: 'middle' },
        3: { valign: 'middle', cellWidth: 200 },
        4: { valign: 'middle', minCellWidth: 30 }, // 第4列居中,宽度最小30
      },
      theme: 'grid', // 主题
      startY: 80, // 距离上边的距离
      margin: 20, // 距离左右边的距离
      body: res.data, // 表格内容
      columns: [ // 表头
        { header: '类', dataKey: 'lei' },
        { header: '指标', dataKey: 'zhibiao' },
        { header: '要点及要素', dataKey: 'yaosu' },
        { header: '大数据计分方案', dataKey: 'fangan' },
        { header: '得分', dataKey: 'defen' },
      ],
    });

    const pageWidth = doc.getPageWidth(); // A4纸:595.28
    const x1 = (pageWidth - doc.getTextWidth(indexTitle)) / 2;
    doc.text(x1, 40, indexTitle); // x坐标,y坐标,文字
    doc.setFontSize(12);// 设置文字大小,下一行起有效
    doc.text(20, 60, `总分:${score}`);

    doc.save(`${indexTitle}-大数据指数.pdf`);
  };

```