
### Request
使用的是symfony/http-foundation组件
请求里面存放了$_GET,$_POST,$_COOKIE,$_FILES,$_SERVER等数据


### 在控制器中使用
```
use Illuminate\http-foundation组件

class IndexController
{
	public function index(Request $request)
	{
		// 1.取值
		$request->input('name');
		$request->input('name' , '默认值');		//如果没有取默认值
		
		// 判断有没有
		$bool = $request->has('name');
		
		// 取所有值
		$res = $request->all();
		dd($res);
		
		// 2.判断请求类型
		$string = $request->method();
		
		//判断是否是某种请求类型
		$bool = $request->isMethod('GET');
		
		// 判断是不是ajax
		$bool = $request->ajax();
		
		// 判断是否符合指定的路由
		$bool = $request->is('index/*');
		
		// 获取当前的url
		$bool = $request->url();
	}
}

```