
# $attrs 和 $listenner 的融合

我们知道，在vue2中我们使用v-bind="$attrs"，v-on="$listenner"来将数据和事件做一个承上启下的作用，
但是在vue3中，首先是删除了v-on指令，其次是发现这两个组件的属性过于累赘，所以在当前版本中将 $attrs 和 $listenner 他们的功能进行了融合，
$listenner 现在已作为 $attrs 的其中一部分进行传递，所以只需要在组建上指定 v-bind="$attrs" ，那么将同时拥有传值和传递事件的功能
