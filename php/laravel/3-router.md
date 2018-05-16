 ### 路由简介
 
 简单的说就是将用户的请求转发给相应的程序进行处理
 
 作用就是建立url和程序之间的映射
 
 
 
 ### 
 laravel中的请求类型有 get post put delete patch
 
 
 ### laravel路由文件
 /app/Http/routes.php文件

 ```php
 <?php
   // 2/基本路由
  Route::get('/',function(){
    return view('welcome');
  });
  
    Route::get('base',function(){
      return 'hello world';
    });
    
        Route::post('base2',function(){
          return 'hello world';
        });
        
        // 3.多请求路由
        Route::match(['get','post'],'multy1',function (){
            return '例如可以接受get,post请求';
        });
                Route::any('multy2',function (){
                    return '可以接受任意方式的请求';
                });
                
                
                
         // 4.路由参数
             Route::get('user/{id}',function($id){
               return 'user-id-'.$id;
             });
             // 可选参数，可有可没有，有默认值
          Route::get('user/{name?}',function($name = '默认值'){
            return 'user-name-'.$name;
          });
          // 参数限制：后面where对参数进行正则限制
        Route::get('user/{name?}',function($name = '默认值'){
          return 'user-name-'.$name;
        })->where('name','[A-Za-z]+');
        // 多个参数值
        Route::get('user/{id}/{name?}',function($id,$name = '默认值'){
          return 'userid'.$id.' - name:'.$name;
        });
        // 多个参数值进行限制
        Route::get('user/{id}/{name?}',function($id,$name = '默认值'){
          return 'userid'.$id.' - name:'.$name;
        })->where(['id'=>'[0-9]+','name'=>'[A-Za-z]+']);

    // 5.路由别名  as表示别名
    // 别名的好处就是 可以在别的地方 使用 url(别名) 或者 route('别名') 函数快速生成url地址
        Route::get('user/member-center',['as'=>'center',function(){

            return route('center');
        }]);
        
        //6路由群组
        Route::group(['prefix' => 'admin'],function (){
            
           Route::get('user',function (){
               return '我的地址是 /admin/user';
           });
                      Route::get('home',function (){
                          return '我的地址是 /admin/home';
                      });
           
        });


    // 7 路由中输出视图  view()
              Route::get('view-example',function($name = '默ew认值'){
                return view('hello');
              });
              
              
              // 8.路由关联到控制器
              // 实际开发不可能把所有的逻辑都卸载路由中，所以要关联控制器
               // 两种方法
               Route::get('info','IndexController@info');
               Route::post('info2',['uses' =>'IndexController@info2']);
               // 起别名
                Route::any('member/info3',[
                    'as' => 'memberinfo3',
                    'uses' =>'IndexController@info3'
                    ]);
                // 传参
                  Route::get('admin/user/{name?}','IndexController@info'); //在info（$name）函数接受参数















```