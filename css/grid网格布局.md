
参考文档： https://juejin.im/post/5a96d3795188257a5a4ce688?utm_medium=fe&utm_source=weixinqun

# Grid

Grid 布局又叫做网格布局，顾名思义是一种基于二维网格的布局方式

display: grid;


## 概念

- Container: 网格容器，当我们设置 display: grid; 就将一个容器变成了网格容器，就比如说上面小字本里外层的那个绿框。
- Item: 网格项，在我们设置的网格容器中的每一个子元素都是网格项。
- Line: 网格线，顾名思义啦，这东西就是网格之间分界的线，就上小字本里的横着竖着的线。
- Track: 网格轨道，两条相邻的网格线之间的空间，也就是网格的行或列。
- Cell: 网格单元，两个相邻的行和列之间的区域，也就像是小字本里的每个小格子了。
- Area: 网格区域，四条网格线包围起来的区域。


## 兼容



## Grid 网格布局

最简单的网格布局，就是平均分布。在容器里面平均分配空间，项目自动缩放。


```

	.Grid {
	  display: flex;
	}

	.Grid-cell {
	  flex: 1;
	}

	<div class="Grid">
	  <div class="Grid-cell">...</div>
	  <div class="Grid-cell">...</div>
	  <div class="Grid-cell">...</div>
	</div>

```


#### 百分比布局

某个网格的宽度为固定的百分比，其余网格平均分配剩余的空间。


```
	.Grid {
	  display: flex;
	}

	.Grid-cell {
	  flex: 1;
	}

	.Grid-cell.u-full {
	  flex: 0 0 100%;
	}

	.Grid-cell.u-1of2 {
	  flex: 0 0 50%;
	}

	.Grid-cell.u-1of3 {
	  flex: 0 0 33.3333%;
	}

	.Grid-cell.u-1of4 {
	  flex: 0 0 25%;
	}

	<div class="Grid">
	  <div class="Grid-cell u-1of4">...</div>
	  <div class="Grid-cell">...</div>
	  <div class="Grid-cell u-1of3">...</div>
	</div>

```
