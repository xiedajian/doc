

## 解决text-overflow: ellipsis;不生效的问题

按照text-overflow: ellipsis;使用规则，在标签样式中添加该属性未生效，例如：

```
.text {
text-overflow: ellipsis;
}

<div class="text">长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字长文字</div>
```


之后，发现并没有达到我们想要的预期效果，其实还需要另外2个CSS属性的支持：

```
.text {
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
}
```

其中，white-space是设置文本不换行，overflow设置标签超出部分自动隐藏，另外提醒，该CSS属性在某些浏览器上不生效，如果不需要照顾不兼容的浏览器，比如IE，可以放心大胆使用。




