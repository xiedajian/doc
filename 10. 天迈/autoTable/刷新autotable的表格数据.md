
# 刷新表格数据

`this.$refs.table.refresh();`  刷新列表数据


# 案例

比如 用户管理-对用户进行禁用

在表格的在 operation 添加一个操作按钮，点击后调取接口，然后刷新列表

案例：
```
 <auto-table ref="table"  :table="table" ></auto-table>
 
 export default {
   name: "basic-customer",
   data() {
     return {
       table: {
         url: "/coldchain/customer",
         pagination: "urlParams",
         pageIndexKey: "page",
         pageSizeKey: "size",
         align: "center",
         operation: {
           width: "150px",
           type: "text",
           size: "mini",
           buttons: [
             {
               name: "详情",
               command: "detail",
               type: "primary"
             },
			 
             {
               name: "启用",
               type: "success",
               click: (data, prop) => {
                 console.log(data, prop);
                 customerPud({ cusNo: data.cusNo, status: 1 }).then(() => {
                   this.$refs.table.refresh();
                 });
               },
               show: data => {
                 return data.status === 0;
               }
             },
             {
               name: "禁用",
               type: "danger",
               click: (data, prop) => {
                 console.log(data, prop);
                 this.$confirm("此操作将禁用用户, 是否继续?", "提示", {
                   type: "warning"
                 }).then(() => {
                   customerPud({ cusNo: data.cusNo, status: 0 }).then(() => {
                     this.$refs.table.refresh();
                   });
                 });
               },
               show: data => {
                 return data.status === 1;
               }
             }
           ]
         },
         columns: [
           {
             label: "用户名",
             prop: "cusName"
           },
           {
             label: "姓名",
             prop: "realname"
           },
           {
             label: "状态",
             prop: "status",
             render: ({ status }) => {
               if (status === 0) return "禁用";
               if (status === 1) return "启用";
             }
           }
         ]
       }
     };
   },
 };
 </script>
```



# 说明

`this.$refs.table.refresh();`  刷新列表数据

自定义传的参数 
```js
`this.$refs.table.refresh({a:1,b:2});` 
```
自定义传的参数, 会和搜索框的参数 合并成请求参数


 刷新实际调用的是  `tm-table` 组件的 `fetchHandler()` 方法