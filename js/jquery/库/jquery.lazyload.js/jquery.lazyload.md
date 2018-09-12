
# jquery.lazyload.js

依赖jq的插件，图片延迟加载插件

cdn :  <script src="https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.js"></script>

## 使用

先引入依赖

```
	<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.js"></script>
```

html代码:

为图片加入样式lazy  图片路径引用方法用data-original

```
		<img class="lazy" data-original="img/bmw_m1_hood.jpg">
		<img class="lazy" data-original="img/bmw_m1_side.jpg">
		<img class="lazy" data-original="img/viper_1.jpg">
		<img class="lazy" data-original="img/viper_corner.jpg">
		<img class="lazy" data-original="img/bmw_m3_gt.jpg">
		<img class="lazy" data-original="img/corvette_pitstop.jpg">


```

js代码：

```

        // 1.简单用法
        $("img.lazy").lazyload();

        // 2.提前加载  Threshold
        //  通过设置Threshold参数来实现滚到距离其xx px时就加载
        $("img.lazy").lazyload({
            threshold :20
        })

        // 3.事件触发才加载
        $("img.lazy").lazyload({
            event : "click"
        });

        // 利用事件触发来实现页面加载成功后5秒开始图片的延迟加载
        $("img.lazy").lazyload({
            event : "sporty"
        });
        var timeout = setTimeout(function() {
            $("img.lazy").trigger("sporty")
        }, 5000);

        // 4. 设定效果——Effects
        $("img.lazy").lazyload({
            effect : "fadeIn"       // fadeIn动画的载入
        });

        // 5.控制懒加载何时停止 （不顺序排列的图片）
        // 插件会执行一个寻找未加载图片的循坏，该循环会检查图片是否可见，默认情况下，当第一个视图外的图片被找到，循环就会停止
        // 将 failurelimit 设为 10 ，它令插件找到 10 个不在可见区域的图片是才停止搜索.
        $("img.lazy").lazyload({
            failure_limit : 10
        });

        // 6.加载隐藏图片
        // 为了提升性能，插件默认忽略隐藏的图片；如果想要加载隐藏图片.设置skip_invisible为false;
        $("img").lazyload({
            skip_invisible : false
        });




```
