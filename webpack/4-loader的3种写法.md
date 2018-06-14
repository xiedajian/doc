
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




### postcss-loader autoprefixer 

1.添加postCSS 支持

npm install -D postcss-loader autoprefixer  

2.配置postcss

根目录下新建 postcss.config.js

```

// postcss.config.js  
module.exports = {  
    plugins: [  
        require('autoprefixer')  
    ]  
}  
```
3. webpack配置文件

```
//webpack.config.js  
module.exports = {  
    ...  
    module: {  
        rules: [  
  
            {  
                test: /\.css$/,  
                use: [  
                    {  
                        loader: "style-loader"  
                    }, {  
                        loader: "css-loader"
                    }, {  
                        loader: "postcss-loader"  
                    }  
                ]  
            }  
        ]  
    }  
}  

```

