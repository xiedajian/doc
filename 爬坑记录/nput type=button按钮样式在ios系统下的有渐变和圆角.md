

input type=button按钮样式在ios系统下的渲染效果

在IOS系统下按钮显示的效果是：有渐变的效果-由白变灰

原因：IOS下有默认的按钮渲染方式（颜色渐变和圆角）

解决方法：添加样式  -webkit-appearance:none;这样在android上和IOS下的显示效果就一致了