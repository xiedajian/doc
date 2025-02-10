

npm run serve/build ... 提示 V8 内存溢出


## 解决方式

增大node内存

cmd命令行
```
setx NODE_OPTIONS --max_old_space_size=10240
```