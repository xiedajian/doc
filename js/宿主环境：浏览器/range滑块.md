
修改滑块默认样式参考文档：http://blog.csdn.net/u013347241/article/details/51560290


#H5 滑块 （input type=range）

# range

Range是HTML5中新出现的滑块控件，也是常见的控件的之一

不过这个控件的原始样式略丑，需要进行一些改造。

需要注意的是Internet Explorer 9及更早IE版本并不支持这个控件。 


## 用法

很简单，如下所示：

<input type="range" value="0">

属性：

```
- max	设置或返回滑块控件的最大值
- min	设置或返回滑块控件的最小值
- step	设置或返回每次拖动滑块控件时的递增量
- value	设置或返回滑块控件的 value 属性值
- defaultValue	设置或返回滑块控件的默认值
- autofocus	设置或返回滑块控件在页面加载后是否应自动获取焦点
```

## 美化

各个浏览自带的样式比较丑，需要美化，两种方案：

1. css改造

2. 将滑动条隐藏(设置opacity: 0)，通过自定义div实现


## css改造

美化滑动控件，需要完成以下的五个步骤：

- 去除系统默认的样式；
- 给滑动轨道(track)添加样式；
- 给滑块(thumb)添加样式；
- 根据滑块所在位置填充进度条；
- 实现多浏览器兼容。

如果想要实现填充进度条的效果，
在IE 9以上的浏览器中可以使用::-ms-fill-lower 和 ::-ms-fill-upper来自定义进度条；
在Firefox浏览器中则可以通过::-moz-range-progress来自定义；
而Chrome浏览器中不支持直接设置进度条，而达到填充的效果，所以首先针对Chrome浏览器来实现整个流程


1. 去除系统默认的样式

```
input[type=range] {
    -webkit-appearance: none;
    width: 300px;
    border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
} 
```

2. 给滑动轨道(track)添加样式

```
input[type=range]::-webkit-slider-runnable-track {
    height: 15px;
    border-radius: 10px; /*将轨道设为圆角的*/
    box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/
}
```
原始的控件获取到焦点时，会显示包裹整个控件的边框，所以还需要把边框取消

```
input[type=range]:focus {
    outline: none;
}
```

3. 给滑块(thumb)添加样式

```
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 25px;
    width: 25px;
    margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
    background: #ffffff; 
    border-radius: 50%; /*外观设置为圆形*/
    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
    box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
}
```

4. 根据滑块所在位置填充进度条
新建一个RangeSlider.js文件，实现对滑动控件属性的设置、事件的监听、以及设置回调函数。监听input事件时，对进度条进行填充，让我们来直接看看代码是怎么实现的。

```
$.fn.RangeSlider = function(cfg){
    this.sliderCfg = {
        min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null, 
        max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
        step: cfg && Number(cfg.step) ? cfg.step : 1,
        callback: cfg && cfg.callback ? cfg.callback : null
    };

    var $input = $(this);
    var min = this.sliderCfg.min;
    var max = this.sliderCfg.max;
    var step = this.sliderCfg.step;
    var callback = this.sliderCfg.callback;

    $input.attr('min', min)
        .attr('max', max)
        .attr('step', step);

    $input.bind("input", function(e){
        $input.attr('value', this.value);
        $input.css( 'background', 'linear-gradient(to right, #059CFA, white ' + this.value + '%, white)' );

        if ($.isFunction(callback)) {
            callback(this);
        }
    });
};
```
通过cfg对象来设置滑动控件的min, max, step属性。

对控件绑定input事件，当滑块滑动时会触发该事件，此时完成对进度条的填充，这里我使用的是线性渐变linear-gradient(to right, #059CFA, white ’ + this.value + ‘%, white)这种方式，淡蓝色和白色两种颜色从左至右渐变，渐变的长度根据此时控件的value来确定。事件触发时同时调用回调函数，回调函数完成的功能可自行设计。 
当然你还可以根据自己的需求来监听其他事件，比如change事件，当value值改变时会触发，用法上很灵活。 
如何调用这个js文件里的函数来完成配置呢？很简单，首先在html文件里导入这个js文件，然后直接定义script节点，html代码如下：

```
<!DOCTYPE html>
<html>
    <head>
    <title>demo</title>
        <script type="text/javascript" src="lib/jquery.js"></script>
        <script type="text/javascript"src="src/RangeSlider.js"></script>
        <link rel="stylesheet" href="css/slider.css" type="text/css">
    </head>

    <body>
        <div id="test">
            <input type="range" value="0">
        </div>

        <script>
            var change = function($input) {
                /*内容可自行定义*/
                console.log("123");
            }

            $('input').RangeSlider({ min: 0,   max: 100,  step: 0.1,  callback: change});

        </script>
    </body>
</html>
```






