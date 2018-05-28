
class Member extends Model
{
    // 最简单的模型方法 在控制器中如何使用请查看控制器
    public static function getMember()
    {
        return 'i form model';
    }
    
    // 数据库操作
    // laravel中提供了 DB facade， 查询构造器 ，Eloquent ORM 三种操作数据库方式
    
    ```
    CREATE TABLE IF NOT EXISTS student(
        'id' INT AUTO_INCREMENT PRIMARY KEY,
        'name' VARCHAR(255) NOT NULL DEFAULT '' COMMENT '姓名',
        'age' TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '年龄',
        'created_at' INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '新增时间',
    )ENGINE=InnoDB DEFAULT CHARSET=UTF8 AUTO_INCREMENT=1001 COMMENT='学生表';
    ```
    // 链接数据库需要修改两个文件  config/database.php  .env
    
    
    // 1. -- DB facade (原始查找)   原始sql语句操作表
    public function test1()
    {
        // 新增
        $bool = DB::insert('insert into student(name age) values(?,?)' , [ 'xiedajian',18]);
        echo $bool;
        
         // 查询
         $students = DB::select(' select * from student ');   
         var_dump($students);
         
        // 修改   返回有影响的行数
        $trNum = DB::update('update student set age = ? where name = ?' , [ 20 ,'xidajian']);
        echo $trNum;
        
        // 删除  返回有影响的行数
        $trNum =DB::delete('delete from student where id > ?', [1001]);
         echo $trNum;
    }

    
    // 2. -- 查询构造器    
	// https://docs.golaravel.com/docs/5.0/queries/
    // 简介：使用PDO参数绑定，免于SQL注入，不需额外转义特殊字符。基本满足所有的数据库
    public function test2()
    {
        // 新增 返回bool是否成功
        $bool = DB::table('student')->insert([
            ['name' => 'fangfang', 'age' => 19],
        ]);
        
        // 新增  返回新增记录的id
        $id = DB::table('student')->insertGetId([
            ['name' => 'sunxun', 'age' => 20],
        ]);
        
        // 新增多条数据  返回bool
        $bool = DB::table('student')->insert([
            ['name' => 'name1', 'age' => 19],
            ['name' => 'name2', 'age' => 21],
        ]);
        
        // 更新     返回有影响的行数
        $num = DB::table('student')->where('id',12)->update(['age' => 30]);
        var_dump($num);
         
         // 更新某个字段的值递增减      返回有影响的行数
         $num = DB::table('student')-> increment('age');    //递增1
         $num = DB::table('student')-> increment('age' ，3);     //递增3
         $num = DB::table('student')-> decrement('age');     //递减1
         $num = DB::table('student')-> decrement('age' ，3);     //递减3
         $num = DB::table('student')->where('id',12)-> decrement('age' ，3);     //递减3
         var_dump($num); 
         
         // 删除   返回有影响的行数
         $num = DB::table('student')->delete();    //删除整个表
         $num = DB::table('student')-> where('id' ,12) ->delete();    //条件id=12
         $num = DB::table('student')-> where('id' , '>=' ,12) ->delete();    //条件 id>=15
         
         // 清空数据表   没有返回值  谨慎使用
         DB::table('student')-> truncate();
         
         //查询  get()  first()  pluck()  lists()  select()  chunk()
         $array = DB::table('student')-> get();  //返回符合条件的全部
         $first = DB::table('student')->orderBy('id','desc')-> first();     //根据id倒叙取第一条
         $first = DB::table('student')->where('age','>=',18)->orderBy('id','desc')-> first();     //age大于18的根据id倒叙取第一条
         $first = DB::table('student')->whereRaw('id>=? and age>?',[1001,18])->orderBy('id','desc')-> first();     //age大于18且id大于1001的根据id倒叙取第一条
         $names = DB::table('student')->pluck('name');  // 只取单个字段 name
         $names = DB::table('student')->lists('name','id');  // 只取单个字段 name,但是用id来做下标索引
         $array = DB::table('student')->select('id','name','age')->get();  // select返回指定字段
         // 数据量特别大可以chunk分段查询，每次查100条
         $array = DB::table('student')->chunk(100, function($students){
            var_dump($students);
            // return false; //可以中止chunk流
         });  
         
         // 聚合函数
         $num = DB::table('student')->count();  //返回数量
         $max = DB::table('student')->max('age');  //返回age数值最大的值
         $min = DB::table('student')->min('age');  //返回age数值最小的值
         $avg = DB::table('student')->avg('age');  //返回age数值的平均值
         $sum = DB::table('student')->sum('age');  //返回age数值的总和
		 
		 // 左连接查询  take限制  select指定字段   as表别名  as字段别名
		 $anli=DB::table('anli as a')  	// anli表别名a
            ->where('a.tuijian','=',1)
            ->orderBy('a.id','desc')	
            ->take(5)		//限制(Limit) 5条
            ->leftJoin('fengge as f',function ($join){	//表f
                $join->on('a.fengge_id','=','f.id');
            })
            ->leftJoin('shejishi as s',function ($join){	//表s
                $join->on('a.shejishi_id','=','s.id');
            })
            ->select(['a.*','f.title as fengge','s.title as sjs_name','s.miaoshu as sjs_miaoshu',
                's.titlepic as sjs_pic','s.zizhi as sjs_zizhi','s.num as sjs_num'])
            ->get(); 
    }
}
    
    // 3. -- Eloquent ORM 
    // 简介：数据模型来操作表,ORM模型在数据库中的使用请看控制器
    class Student extends Model
    {
        // 指定表名
        protected $table = 'student';
        
        // 指定主键
        protected $primaryKey = 'id';
        // 允许批量赋值的字段
        protected $fillable = ['name',age];
        // 不允许批量赋值的字段
        protected $guarded = [''];
        
        // 自动维护时间戳
        public $timestamps = false
        // 使自动维护的时间戳格式化
        protected function getDateFormat()
        {
            return time();
        }
        protected function asDateTime($val)
        {
            return $val;
        }
		
		// orm软删除
		// 上述删除方法都会将数据表记录从数据库删除，此外Eloquent模型还支持软删除
		// 所谓软删除指的是数据表记录并未真的从数据库删除，而是将表记录的标识状态标记为软删除，这样在查询的时候就可以加以过滤，让对应表记录看上去是被”删除“了。
		// Laravel中使用了一个日期字段作为标识状态，这个日期字段可以自定义，这里我们使用deleted_at，如果对应模型被软删除，则deleted_at字段的值为删除时间，否则该值为空null
		use SoftDeletes;
		// 标识软删除的字段
		protected $dates = ['deleted_at'];
		
    }
    
    
#### 查询构造器与orm的区别是什么	
查询构造器就是pdo构造sql
而orm是通过面向对象构造sql
	DB主要是一个查询构造器(SQLBuilder)，它会帮你把输入的参数转变成SQL语句去数据库里查询，和你自己手动写SQL语句本质上是一样的。
ORM是一个对象关系映射(Object Relational Mapper)工具,它会把数据库中的数据映射成对象和集合对象，你无需接触底层数据，可以直接调用映射出来的对象进行开发。

DB适合用于对性能要求高或者业务逻辑简单的项目，ORM适合业务逻辑比较复杂的项目
    
    
    
