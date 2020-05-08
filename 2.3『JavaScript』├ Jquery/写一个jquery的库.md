
# 例如写一个移动端全兼容的‘点击复制到剪贴板’插件

```
;(function($){
	var defaults = {
		content:"",//自定义复制链接地址
		callback:null//成功回调
	};
	$.extend({
		copy:function(option){
			var options = $.extend({},defaults,option);
			var content = options.content == "" ? "请配置复制内容" : options.content;
		    var u = navigator.userAgent; 
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
			if(isAndroid || (!isAndroid && !isiOS)){
				var txt = document.createElement('textarea');
				txt.style = 'position:absolute;top:-9999px;left:-9999px;';
				txt.setAttribute('id',"selector");
				txt.setAttribute('readonly','readonly');
				txt.innerHTML = content;
				$('body').append(txt);
				$("#selector").select();
				document.execCommand("copy",false,null);
			}
			if(isiOS){
				var txt = document.createElement('a');
				txt.setAttribute('id',"selector");
				txt.setAttribute('style','position:absolute;top:-9999px;left:-9999px;');
				txt.innerHTML = content;
				$('body').append(txt);
				var copyDOM = document.querySelectorAll('#selector');
				var range = document.createRange();  
				range.selectNode(copyDOM[0]);
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(range);
				document.execCommand('copy'); 
			}
			$("#selector").remove();
			if(options.callback) options.callback();
		}
	});
})(jQuery);
```



# 使用

```
<body>
	
    <button class="copy">复制链接</button>
    <button class="copy">复制链接</button>

    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    <script src="jquery.copy.js"></script>
    <script>
        $(function(){
            $(".copy").click(function(){
                $.copy({
                    content:"自定义复制内容", //自定义复制内容，默认'请配置复制内容'
                    callback:function(){ //自定义复制成功回调函数，常用于复制成功提示，不配置callback，则不显示
                        alert('复制成功');
                    }
                });
            }) 	
        });
    </script>
</body>
```