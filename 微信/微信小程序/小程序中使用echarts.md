

文档：https://github.com/ecomfe/echarts-for-weixin


# 在小程序中使用echarts

为了兼容小程序 Canvas，ECharts提供了一个小程序的组件，用这种方式可以方便地使用 ECharts。


# 下载组件

下载项目

其中，ec-canvas 是提供的组件，其他文件是如何使用该组件的示例。

ec-canvas 目录下有一个 echarts.js，默认在每次 echarts-for-weixin 项目发版的时候替换成最新版的 ECharts。如有必要，可以自行从 ECharts 项目中下载最新发布版，或者从官网自定义构建以减小文件大小


## 使用

1. 在使用的页面配置 .json 文件引入组件

```
{
    "usingComponents": {
        "ec-canvas": "../../../vendor/ec-canvas/ec-canvas"
    }
}

```

这一配置的作用是，允许我们在 pages/bar/index.wxml 中使用 <ec-canvas> 组件。注意路径的相对位置要写对，如果目录结构和本例相同，就应该像上面这样配置


2. 在 wxml 中使用 <ec-canvas> 组件

```
<view class="container">
  <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
</view>

```

其中 ec 是一个我们在 index.js 中定义的对象，它使得图表能够在页面加载后被初始化并设置


3. 在使用的页面 js 文件中

```
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    ...
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});

```

这对于所有 ECharts 图表都是通用的，用户只需要修改上面 option 的内容，即可改变图表。option 的使用方法参见 ECharts 配置项文档。

ECharts 配置项文档: http://echarts.baidu.com/option.html


## 要求

支持微信版本 >= 6.6.3，对应基础库版本 >= 1.9.91。

调试的时候，需要在微信开发者工具中，将“详情”下的“调试基础库”设为 1.9.91 及以上版本