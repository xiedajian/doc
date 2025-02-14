

天擎线网优化的代码发现在高德地图画od飞线。用的 echarts 图层花的





![image-20241213114740862](img/高德地图使用echarts图层/image-20241213114740862.png)



```
import EchartsLayer from '@/components/AMapEcharts';

EchartsLayer.init(this.map).then(echarts => {
    this.echarts = echarts;
    this.echarts.setOption(this.options);
});
```

