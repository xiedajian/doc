
use app\Member;  //使用model的案例

 class  UserController extends Controller
 {
    // 最简单的方法
    public function index()
    {
        return 'hello';
    }
    // 路由过来的带参数的请求
    public function index2($id)
    {
        return 'member-info-id-'.$id;
    }
    
    public function index3($id)
    {
        // 用route方法生成别名为index的路由地址
        return route('index');
    }
    // 返回一个视图
    public function index3($id)
    {   // view 方法使用一个模板
        return view('home');
    }
    // 向视图模板中传递变量
    public function index3($id)
    {   // view 方法使用一个模板
        return view('home'，[
            'name' => 'xdj',
            'age' => 21,
        ]);
    }
    
    public function useModel()
    {
        // 在控制器中调用model中的方法
        return Member::getMember();
    }
    
    // 控制器中使用声明好的 ORM 数据模型
    public function useORMModel()
    {
        // all 查询全部
        $students =  Student::all();
        // find 查询单个
        $students =  Student::find();
        $students =  Student::find(1001);   //主键值为1001的
        // findOrFail() 查询不到就报错
         $students =  Student::findOrFail(1006);
        
        dd($students);
    }
    
    //使用model模型新增数据
    public function orm2()
    {
        // 单条
        $student = new Student();
        $student->name = 'xdj';
        $student->age = 18;
        $bool = $student->save();   //保存
        
        // 批量
        $student = Student::create(['name'=>'xdj', 'age'=>18]);
        
        // firstOrCreate() 取第一个，若没有则添加
        $student = Student::firstOrCreate(['name'=>'xdj', 'age'=>18]);
    }
    //使用model 更新数据
    public function orm3()
    {
        // 通过模型来更新数据
        $student =Student::find(1021);
        $student->name = 'zhuzhu';
        $student->age = 18;
        $bool = $student->save();   //保存
        
        // 同构查询构造器更新
        $num = Student::where('id','>','10')->update(['age'=>41]);

    }
 }