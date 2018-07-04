

## 网格布局

最简单的网格布局，就是平均分布。在容器里面平均分配空间，跟上面的骰子布局很像，但是需要设置项目的自动缩放。


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
