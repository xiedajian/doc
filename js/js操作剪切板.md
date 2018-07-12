

# 复制文本到剪贴板

使用 window.clipboardData 实现复制到剪贴板功能，也仅仅支持IE和FF浏览器

自Chrome 43版本发布，增加 document.execCommand 命令支持




## ZeroClipboard
独立的js库Zero Clipboard简单实现复制到剪贴板功能

Zero Clipboard作为一个独立的js库，它利用 Flash 进行复制，需要两个文件：ZeroClipboard.js 和 ZeroClipboard.swf 

zeroClipboard利用透明的 flash 覆盖在复制按钮上，点击 flash，将复制内容传入到 flash 中，再通过 flash 把传入的内容写到剪贴板上

可能由于Flash技术正被各大浏览器厂商冷落，已经不是很好的选择


## clipboard.js

将文本复制到剪贴板的现代方法

没有Flash。没有框架。只需3kb gzipped

取代flash复制到剪切板，更好页面性能，不会造成卡顿想象，不止兼容PC端，还优雅的兼容移动端ios的safari浏览器

官网： https://clipboardjs.com/



## 原生js

```
	(function(){
	    var btn = document.getElementById('J_DoCopy'),
	        text = document.getElementById('J_TextIn');
	    btn.onclick = function(){
	        var transfer = document.getElementById('J_CopyTransfer');
	        if (!transfer) {
	            transfer = document.createElement('textarea');
	            transfer.id = 'J_CopyTransfer';
	            transfer.style.position = 'absolute';
	            transfer.style.left = '-9999px';
	            transfer.style.top = '-9999px';
	            document.body.appendChild(transfer);
	        }
	        transfer.value = text.value;
	        transfer.focus();
	        transfer.select();
	        document.execCommand('Copy', false, null);
	    };
	})();


```

简化版本

```
	(function(){
	    var btn = document.getElementById('J_DoCopy'),
	        text = document.getElementById('J_TextIn');
	    btn.onclick = function(){
	        text.focus();
	        text.select();
	        document.execCommand('Copy', false, null);
	        text.blur();
	    };
	})();


```

### 核心技能

document.querySelector('.target').select();		// 选择对象

document.execCommand('Copy', false, null);		// 执行浏览器复制命令

window.clipboardData.setData("Text",'xxxxx');	// 设置剪切板内容


### 兼容写法

```
	function copyToClipboard(txt) {
	            if (window.clipboardData) {
	                window.clipboardData.clearData();
	                clipboardData.setData("Text", txt);
	                alert("复制成功！");

	            } else if (navigator.userAgent.indexOf("Opera") != -1) {
	                window.location = txt;
	            } else if (window.netscape) {
	                try {
	                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	                } catch (e) {
	                    alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'");
	                }
	                var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
	                if (!clip)
	                    return;
	                var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
	                if (!trans)
	                    return;
	                trans.addDataFlavor("text/unicode");
	                var str = new Object();
	                var len = new Object();
	                var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
	                var copytext = txt;
	                str.data = copytext;
	                trans.setTransferData("text/unicode", str, copytext.length * 2);
	                var clipid = Components.interfaces.nsIClipboard;
	                if (!clip)
	                    return false;
	                clip.setData(trans, null, clipid.kGlobalClipboard);
	                alert("复制成功！");
	            }
	        }


```
