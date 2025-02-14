


# commitProxy

内置指令
```
gridMethods.commitProxy('query')
// insert
// insert_actived
// mark_cancel
// remove
// import
// open_import
// export
// open_export
// reset_custom
// _init
// 重置page页码 并查询
gridMethods.commitProxy('_init') 
// reload
// 重新载入，可以重置一些参数但并不能重置查询参数
gridMethods.commitProxy('reload') 
// query
// delete
// save
```


自定义注册内置指令

```
VXETable.commands.add(command, this[method]);
```