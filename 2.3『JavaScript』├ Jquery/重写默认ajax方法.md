
- $.get
- $.post
- $.ajax

get 和 post 底层调用的还是 $.ajax 方法，所以只需要重写$.ajax 方法


```js
 //首先备份下jquery的ajax方法  
    var _ajax=$.ajax;  
       
    //重写jquery的ajax方法
    $.ajax=function(opt){  
        //备份opt中error和success方法 
        var fn = {  
            error:function(XMLHttpRequest, textStatus, errorThrown){},  
            success:function(data, textStatus){}  
        }  
        if(opt.error){  
            fn.error=opt.error;  
        }  
        if(opt.success){  
            fn.success=opt.success;  
        }  
           
        //扩展增强处理 
        var _opt = $.extend(opt,{  
            error:function(XMLHttpRequest, textStatus, errorThrown){
            debugger;
                erro = eval("(" + XMLHttpRequest.responseText + ")");
                if(erro.err_code == 500)
                    alert(erro.err_msg);
                //错误方法增强处理 
                fn.error(XMLHttpRequest, textStatus, errorThrown);  
            },  
            success:function(data, textStatus){
                //成功回调方法增强处理  
                fn.success(data, textStatus);  
            },  
            beforeSend:function(xhr){  
                xhr.setRequestHeader('X-Token',"X-Token");
                 xhr.setRequestHeader('X-Client',"PC");
                xhr.setRequestHeader('Content-Type',"application/json");
            }
        });  
        return _ajax(_opt);  
    };
```