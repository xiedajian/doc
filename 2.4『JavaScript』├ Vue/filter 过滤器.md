
# filter 过滤器

过滤器本质就是数据在呈现之前先进行过滤和筛选。
作用：文本数据格式化
过滤器可以用在两个地方：{{}}和 v-bind 表达式
两种过滤器：1 全局过滤器 2 局部过滤器


全局过滤器

说明：通过全局方式创建的过滤器，在任何一个vue实例中都可以使用
注意：使用全局过滤器的时候，需要先创建全局过滤器，再创建Vue实例
显示的内容由过滤器的返回值决定

```
Vue.filter('filterName', function (value) {
  // value 表示要过滤的内容
})
```

示例：

```
<div>{{ dateStr | date }}</div>
<div>{{ dateStr | date('YYYY-MM-DD hh:mm:ss') }}</div>

<script>
  Vue.filter('date', function(value, format) {
    // value 要过滤的字符串内容，比如：dateStr
    // format 过滤器的参数，比如：'YYYY-MM-DD hh:mm:ss'
  })
</script>

```

## 局部过滤器

说明：局部过滤器是在某一个vue实例的内容创建的，只在当前实例中起作用

```
	{
	  data: {},
	  // 通过 filters 属性创建局部过滤器
	  // 注意：此处为 filters
	  filters: {
	    filterName: function(value, format) {}
	  }
	}
```
