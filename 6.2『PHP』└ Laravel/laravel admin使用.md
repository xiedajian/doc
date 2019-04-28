
#### 添加一个明星表
```
CREATE TABLE `stars` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

#### 然后在项目 /app/ 目录下创建一个 Star表 的Model 数据模型文件 Star.php

```
<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Star extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}

```

#### laravel-admin可以根据数据模型文件快速生成表的CURD操作页面：

```
php artisan admin:make StarController --model=App\\Star

// 在windows系统中
php artisan admin:make StarController --model=App\Star
```
命令会创建路由器文件app/Admin/Controllers/StarController.php

#### 配置路由
在laravel-admin的路由配置文件app/Admin/routes.php里添加一行：
```
$router->resource('star', StarController::class);
```

#### 即可访问

http://***/admin/star

#### 加入后台管理的导航菜单
http://www.blog.com/admin/auth/menu

到底已经结束

**再具体的修改到生成的StarController进行修改**



