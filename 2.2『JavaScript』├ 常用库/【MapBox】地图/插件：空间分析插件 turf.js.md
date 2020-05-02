[mapbox插件集合](https://www.mapbox.cn/mapbox-gl-js/plugins/)
[TURF官网](http://turfjs.org/)
[参考](https://www.cnblogs.com/jyughynj/p/11225403.html)



mapbox-gl能够方便地显示地图，做一些交互，但是缺少空间分析功能，比如绘制缓冲区、判断点和面相交等等。

# TURF

turf.js是一个丰富的用于浏览器和node.js空间分析库，

非常适合于mapbox-gl开发，不仅mapbox-gl里面推荐的空间分析插件有turf，而且turf.js官网的示例均基于mapbox实现。

Turf使用GeoJSON来处理所有地理数据。 Turf的数据标准是WGS84经度、纬度坐标，使用geojson.io这个工具轻松创建此数据。



# 安装

普通script标签引入方式， 
```
 <script src='https://npmcdn.com/@turf/turf/turf.min.js'></script>
 <script>
      var point = turf.point([119.625, 39.984]);
 </script>
```

NPM:
```
// 部分安装
npm install @turf/area @turf/buffer 
// 全部安装
npm install @turf/turf
```
npm方式，可以按照以下方式引入
```
 import buffer from '@turf/buffer' // 按需引用
 import area from '@turf/area'
 import {point, circle, bboxPolygon, booleanPointInPolygon} from '@turf/turf' // 一次引入多个
 import * as turf from '@turf/turf' // 一次性引入
```



### 1. 先介绍几个功能介绍

1.1 测量相关MEASUREMENT

如面积(area)、长度(length)、中心(center)、包络线(envelope)

1.2 转换相关TRANSFORMATION

缓冲区buffer、绘制圆circle

1.3 判断相关

 判断点是否在多边形内booleanPointInPolygon

 判断是否包含booleanContains

turf的功能相当丰富，用到时查文档吧


