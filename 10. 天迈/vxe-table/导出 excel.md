

# 导出文件
vxe-table 导出 excel xlsx wps 导出数据

默认支持的导出格式为：txt、html、xml、cvs   	// 这几种不需要安装额外的依赖

导出 xlsx， pdf 需要额外安装插件

https://vxetable.cn/other3/#/table/plugin/exportXLSX






# 导出 xlsx

如果需要导出为 xlsx 格式文件，就需要用到 exceljs（该插件默认不支持IE，要支持 IE 请去查看插件用法） 这个库来转换数据，然后再安装 vxe-table-plugin-export-xlsx 导出插件（支持v2、v3、v4），安装完成后列表中就可以选择 xlsx 类型了。

[vxe-table-plugin-export-xlsx](https://github.com/x-extends/vxe-table-plugin-export-xlsx)



```
// 安装
npm i vxe-table-plugin-export-xlsx@2.1.2 exceljs


// 引用
import TMVXETable, {VXETable} from '@tiamaes/vxe-table';
import '@tiamaes/vxe-table/index.css';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import ExcelJS from 'exceljs'

Vue.use(TMVXETable);
VXETable.use(VXETablePluginExportXLSX, {
	ExcelJS
})
```



需要注意对应版本使用

@tiamaes/vxe-table 内置了部分依赖 ：

```
  "dependencies": {
    "resize-detector": "^0.3.0",
    "sortablejs": "^1.14.0",
    "vxe-table": "3.6.12",
    "vxe-table-plugin-element": "^1.11.4",
    "xe-utils": "^3.5.7"
  },
```

因为固定了 vxe-table 使用 3.6 版本，所以 vxe-table-plugin-export-xlsx 要用 v2 版本

vxe-table v3.8 以上 应该 搭配  vxe-table-plugin-export-xlsx  v3版本使用




# 导出 pdf
如果需要导出为 pdf 格式文件，就需要用到 jspdf.js 这个库来转换数据，然后再安装 vxe-table-plugin-export-pdf 导出插件（支持v2、v3、v4），安装完成后列表中就可以选择 pdf 类型了。



```
npm install vxe-table-plugin-export-pdf@3.3.4 jspdf
```

vxe-table-plugin-export-pdf 是否使用 v3版本需要测试，出问题可以考虑降版本 （因为@tiamaes/vxe-table用的低版本表格固定了）

 