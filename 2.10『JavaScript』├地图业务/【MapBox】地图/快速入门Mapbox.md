# Mapbox
[Mapbox](https://www.mapbox.com/)
[官网](https://docs.mapbox.com/mapbox-gl-js/api/)


1.是什么？

    mapbox是一家非常牛的公司，比如像特斯拉、DJI大疆创新、孤独星球、Airbnb、GitHub、Cisco、Snap、飞猪、Keep、Bosch这些在国内外各自领域中响当当的企业都是它的客户。专注于帮助企业打造定制化地图应用的Mapbox就是这样一家“你看不见我，但我无处不在”的企业。可以开发和定制web、android、IOS、VR、无人驾驶、甚至是游戏地图场景等。      

	mapbox-gl是Mapbox一款开源Web地图服务解决方案，用于搭建精美的地图服务，可以免费创建并定制个性化地图的网站。
	他最大的优点就是可以使用类似于css的样式来描述地图，并提供类似于photoshop的图像界面来设计和生成精美的样式。
	我们本篇主要讲一下Mapbox在Web地图中的应用。
	
	
2.了解一些基本东西

   常见的 mapbox.js和mapbox-gl.js的异同点？

    相同点：

                1.都是由Mapbox公司推出的免费开源的JavaScript库

                2.都可以作为前端渲染矢量瓦片交互地图的工具

                3.它们的样式设置都支持Mapbox Style

 

    不同点：

                1.mapbox.js是Leaflet的一个插件，使用方式是通过结合Leaflet使用

                2.mapbox-gl.js是Leaflet的一个插件，使用方式是通过结合Leaflet使用

                3.使用mapbox-gl.js的浏览器必须支持WebGL渲染，在旧的浏览器中是不支持mapbox-gl.js的，而mapbox.js则没有 此限制
				
3.能表达整个Map的style文件
mapbox-gl.js目前是围绕style文件来进行的，其内容如下：
```
{
 
    "version": 8,
 
    "name": "Mapbox Streets",
 
    "sprite": "mapbox://sprites/mapbox/streets-v8",
 
    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
 
    "sources": {...},
 
    "layers": [...]
 
}
```

从以上可以看出，除了一些基本的属性定义之外，就是sources和layers。

mapbox通过这样一个style的配置文件来描述整个地图，这是目前其他map都没有使用的方式。
在讨论如何设计实现这个目的之前， 我们想一下这样做有什么好处？最大的好处莫过于为自定义地图提供了方便之门。
使用者压根可以不写任何代码，用mapbox就能做出一个自己想要的地图。
这一点很符合mapbox目前提供的服务。style如此之重要，以至于官网专门对style进行详细了说明， 涉及到各个参数及作用。


Map的组成：

任何GIS引擎必然要处理两个部分，一个是数据来源，一个是这些数据在界面呈现的样子，在style里面的source和layer对应于这两个部分。

4.Source：

    目前source支持vector，raster， geojson， image，video。geojson的支持比较巧妙，有了这个就可以处理各种矢量类型，包括集合。
	而vector主要解决的是矢量瓦片，raster解决的是目前常用的栅格化的瓦片。video的加入使得功能更加的现代化。
	 mapbox在style里面，为source定义了一个type属性，来说明这些类型。

 

    除了这个属性之外，source其实都有一个id，被layer引用，从而让数据源和数据呈现关联在一起。 
	这个地方需要注意的是，source和layer之间的关系，可以是1->n

5.Layer：

            虽然也是分为几类的，但并不是直接根据source来分类的。
			目前分为：background,fill, line, symbol, raster, circle。
			除了background类型的layer不需要绑定source之外。其他的都需要有source。
			fill类型的layer只负责填充；
			line类型的layer只负责线条；
			symbol类型的layer会处理sprite，文字等；
			raster类型的layer就只负责图片， 
			circle类型的layer是更高一层的业务处理需要。
           不管是什么界面，都是由点线面组成的。 
		   layer其实代表的就是界面，只是大家通常会认为一个layer上会放置各种点，线，面。
			mapbox把这种layer再细分层了更小的单元， 只包含点的layer，只负责呈现线的layer，只负责面的layer。
			如果把多个layer组合在一起，就和现在的通用想法的layer是一样的，source和layer的1->n关系在这个地方发挥作用了。
            这样设计不仅简单化，关键还可以提高效率，能批量化的渲染。

		Filter：

           mapbox也充分考虑了个别特殊元素的定制化显示需求，如果要对一批元素中的某些个别元素进行定制化呈现，
		   可以在layer里面设置filter，满足条件的元素才会被呈现出来，并用layer设定的样式渲染。
		   filter是一个很强大的功能，有效融合在设计中，可以解决很多问题。

6.
     style文件才是核心，API只是围绕着这个核心服务的
     想看API， 可以参见 https://www.mapbox.com/mapbox-gl-js/api 。