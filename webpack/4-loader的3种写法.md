
总结loader的三种写法

```

1.use:['xxx-loader','xxx-loader']
2.loader:['style-loader','css-loader']
3.use:[
        {loader:'style-loader'},
        {loader:'css-loader'}
   ]
```
一般简单的用第一种,涉及参数配置的用第三种


