百度地图上Marker类型设置简单，可以使用自己定义的图标，还支持对图标的偏移和旋转，

但是因为它只根据了一个中心点，造成了一个问题，

设置的图标自身不支持跟随地图进行放缩。

这样就造成了在特定场景下无法满足业务的需求。

百度地图地面叠加层GroundOverlay可以设置自己的图标，因为它是根据经纬度范围设置的，

所以支持跟随地图放缩。

但是在javascript开发中它并不支持对图形的旋转。

图形的旋转可以用C++或者JAVA对图形矩阵做变换得到。

所以想要支持旋转的就无法实现了。

如果我想设计一个既支持放缩，又能设置旋转的旗标，那该怎么办呢？

有一种方案：

Marker + addEventListener('zoomEnd',function(){});

使用Marker类型，并且监听地图放缩事件，动态设置图标大小。