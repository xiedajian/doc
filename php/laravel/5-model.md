
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
         $names = DB::table('student')->pluck('name');  // 只取单个name字段
         $names = DB::table('student')->lists('name','id');  // 只取单个name字段,但是用id来做下标索引
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
    }
    
    
    
    
    
