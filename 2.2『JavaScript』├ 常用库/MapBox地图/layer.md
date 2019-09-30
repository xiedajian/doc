
## 绘制阴影面积
```

map.addLayer({
                'id': 'maine',
                'type': 'fill',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    [
                                        104.06616926193237,
                                        30.553872161234633
                                    ],
                                    [
                                        104.05172824859619,
                                        30.55372433465804
                                    ],
                                    [
                                        104.05170679092407,
                                        30.55132212123368
                                    ],
                                    [
                                        104.05044078826904,
                                        30.54932639102504
                                    ],
                                    [
                                        104.06657695770264,
                                        30.54932639102504
                                    ],
                                    [
                                        104.06616926193237,
                                        30.553872161234633
                                    ]
                                ]
                            ]
                        },
                        id:'3'
                    }
                },
                'layout': {},
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity':["case",
                        ["boolean", ["feature-state", "hover"], false],//判断鼠标移上去显示颜色
                        1,
                        0.5
                    ]
                }
            });
```


## 地图上自定义建筑体
```
map.addLayer({
            'id': 'room-extrusion',
            'type': 'fill-extrusion',
            'source': {
                'type': 'geojson',
                'data': {
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "level": 1,
                                "name": "Bird Exhibit",
                                "height": 10,
                                "base_height": 0,
                                "color": "red"
                            },
                            "geometry": {
                                "coordinates": [
                                    [
                                         [104.061089, 30.547254],
                                         [104.061089, 30.547380],
                                         [104.061180, 30.547380],
                                         [104.061180, 30.547250],
                                         [104.061089, 30.547254],
                                    ]
                                ],
                                "type": "Polygon"
                            },
                            "id": "08a10ab2bf15c4d14669b588062f7f08"
                        },

                        {
                            "type": "Feature",
                            "properties": {
                                "level": 1,
                                "name": "Ancient Egypt",
                                "height": 30,
                                "base_height": 0,
                                "color": "blue"
                            },
                            "geometry": {
                                "coordinates": [
                                    [
                                       
                                        [104.061089, 30.547254],
                                        [104.061089, 30.547140],
                                        [104.061180, 30.547140],
                                        [104.061180, 30.547200],
                                        [104.061180, 30.547254]
                                    ]
                                ],
                                "type": "Polygon"
                            },
                        },
                    ],
                    "type": "FeatureCollection",
                }
            },
            'paint': {
                'fill-extrusion-color': ['get', 'color'],
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-base': ['get', 'base_height'],
                'fill-extrusion-opacity': 0.5
            }
        });
```


## 绘制line且颜色渐变
```
map.addSource('line', {
                type: 'geojson',
                lineMetrics: true,
                data: geojson
            });
            map.addLayer({
                type: 'line',
                source: 'line',
                id: 'line',
                paint:{
                    'line-color':'red',
                    'line-width':5,
                    'line-gradient':[
                        'interpolate',
                        ['linear'],
                        ['line-progress'],
                        0,'blue',
                        0.1,'royalblue',
                        0.3,'cyan',
                        0.5,'lime',
                        0.7,'yellow',
                        1,'red'
                    ]
                },
                layout:{
                    'line-cap':'round',
                    'line-join':'round'
                }
            });
```


## 绘制图片
```
map.loadImage('./dingwei.png', function(error, image) {
                if (error) throw error;
                map.addImage('cat', image);
                map.addLayer({
                    "id": "points",
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [

                                {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [104.061089,30.547254]
                                },
                                "properties": {
                                    "name": '坐标点1'
                                }
                            },
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [ 104.05436754226685, 30.55174713255279]
                                    },
                                    "properties": {
                                        "name": '坐标点2<p>asfdasfdas</p>'
                                    }
                                }
                            ],

                        },
                    },
                    "layout": {
                        "icon-image": "cat",
                        "icon-size": 0.1
                    }
                });
            });

```