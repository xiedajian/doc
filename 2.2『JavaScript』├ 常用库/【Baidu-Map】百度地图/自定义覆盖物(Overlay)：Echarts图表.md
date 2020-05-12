[原文](https://www.cnblogs.com/itgiser/p/11463352.html)


# 百度地图结合ECharts实现复杂覆盖物(Overlay)



官方Overlay-覆盖物的抽象基类



## 新建complexCustomOverlay.js文件
```
!function(baiduMap) {
        /**
         * 自定义覆盖物类, 取名 ComplexCustomOverlay 使用时直接 new ComplexCustomOverlay 即可
         * 示例 new ComplexCustomOverlay(121.620483, 31.291102, function(div_obj){});
         * @param {*} lng 经度
         * @param {*} lat 维度
         * @param {*} callback 回调方法
         */
        ComplexCustomOverlay = function(lng, lat, callback) {
            this._point = new baiduMap.Point(lng, lat);
            this._callback = callback;
        };
		//继承Overlay基类
        ComplexCustomOverlay.prototype = new baiduMap.Overlay();
		/**
          * 实现initialize方法，此方法在map.addOverlay(--)时会自动调用，完成初始化工作
         */
        ComplexCustomOverlay.prototype.initialize = function(map) {
            this._map = map;
            //生成div,用来承载ECharts
            var div = this._div = document.createElement("div");
            // 可以根据情况添加些样式信息
            // div.style.backgroundColor = "#fff";
            div.style.zIndex = baiduMap.Overlay.getZIndex(this._point.lat);
            div.style.width = "100px";
            div.style.height = "100px";
            // marginLeft marginTop 的设置可以让这个div的中心点和给定的经纬度重合
            div.style.marginLeft = '-50px';
            div.style.marginTop = '-50px';
            //必须是绝对定位，不然会偏离原来位置
            div.style.position='absolute';
            //将该覆盖物添加到标签覆盖物列表
            map.getPanes().labelPane.appendChild(div);
            //调用传入的回调方法
            this._callback(div);
            return div;
        };
		/**
          * 当地图发生变化，会自动调用此方法，进行覆盖物的重绘工作
          * 例如 拖动地图、地图放大缩小等操作，都会自动调用draw方法进行重绘
         */
        ComplexCustomOverlay.prototype.draw = function(){
            //饼图的位置设置,需要获取该地图点的像素位置x,y
            var pixel = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x + "px";
            this._div.style.top  = (pixel.y - 30) + "px";
        }
}(BMap); // 将BMap作为参数传入
```


## 调用

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>百度地图结合ECharts实现复杂覆盖物(Overlay)</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
        }
        #map {
            height: 100%;
            width: 100%; 
        }
    </style>
    <script type="text/javascript" src="./js/echarts.min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=5ieMMexWmzB9jivTq6oCRX9j&callback"></script>
    <script type="text/javascript" src="./js/complexCustomOverlay.js"></script>
</head>
<body>
    <div id="map"></div>
</body>
</html>

<script type="text/javascript">
        var map = new BMap.Map("map");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(121.620523, 31.290215), 18);  
        map.setCurrentCity("上海");
        map.enableScrollWheelZoom(true);
        // 地图加载完成事件
        // map.addEventListener("tilesloaded",function(){alert("地图加载完毕");});
        map.addEventListener('zoomend', function(e){
            var zoom = e.target.getZoom();
            if(zoom < 17) { // 小于17级，统计图
                myCompOverlay.hide();
            } else {
                myCompOverlay.show();
            }
        });

        var drawPie = function(obj) {
            //map.removeOverlay(overlay: Overlay)
            //map.clearOverlays()
            var echarts2 = echarts.init(obj);
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{b}:{c}"
                },
                series : [
                    {
                        name: '人流统计图',
                        type: 'pie',
                        radius : ['0', '35%'],
                        data:[
                            {value:679, name:'人流数量'}
                        ],
                        color:['green'],// 饼图的颜色
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                padding: [0, 0, 20, 0],
                                formatter: '{c}'
                            },
                        },

                        labelLine: {
                            show: false
                        }
                    },
                    {
                        name: '垃圾桶数量统计',
                        type: 'pie',
                        radius : ['40%', '100%'],
                        data:[
                            {value:335, name:'干垃圾桶'},
                            {value:110, name:'湿垃圾桶'},
                            {value:210, name:'可回收垃圾桶'},
                            {value:410, name:'有害垃圾桶'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: '{c}'
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    }
                ]
            };
            echarts2.setOption(option);
        };
		// 实例化自定义Overlay,传入经纬度以及回调方法
        var myCompOverlay = new ComplexCustomOverlay(121.620483, 31.291102, drawPie);
        map.addOverlay(myCompOverlay);
    
</script>
```