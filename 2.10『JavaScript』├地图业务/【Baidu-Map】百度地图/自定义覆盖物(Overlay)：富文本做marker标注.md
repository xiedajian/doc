
[百度地图开源库](http://lbsyun.baidu.com/index.php?title=jspopular3.0/openlibrary)

[案例](http://api.map.baidu.com/library/RichMarker/1.2/examples/advanced.html)

[RichMarker源文件](http://api.map.baidu.com/library/RichMarker/1.2/src/RichMarker.js)

[类参考](http://api.map.baidu.com/library/RichMarker/1.2/docs/symbols/BMapLib.RichMarker.html)

# RichMarker 富标注 

利用的是自定义覆盖物(Overlay)的原理

```
var map = new BMap.Map("container");
map.centerAndZoom(new BMap.Point(116.309965, 40.058333), 17);
var htm = "<div style='background:#E7F0F5;color:#0082CB;border:1px solid #333'>"
             +     "欢迎使用百度地图！"
             +     "<img src='http://map.baidu.com/img/logo-map.gif' border='0' />"
             + "</div>";
var point = new BMap.Point(116.30816, 40.056863);
var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {"anchor": new BMap.Size(-72, -84), "enableDragging": true});
map.addOverlay(myRichMarkerObject);
```
