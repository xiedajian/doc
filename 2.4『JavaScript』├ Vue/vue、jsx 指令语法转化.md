[原文](https://zhuanlan.zhihu.com/p/500610564)




# vue、jsx 指令语法转化


```js
export default {
  data() {
    return {
      num: 1
    };
  },
  methods: {
    Vif() {
      if (this.num === 1) {
        return <span> 分支1 </span>;
      } else if (this.num === 2) {
        return <span> 分支2 </span>;
      } else {
        return <span> 分支3 </span>;
      }
    },
    clickHandle(){
      alert('click')
    }
  },
  render() {
    return (
      <div>
        <div>{this.num} </div>

        {/* v-if-else 条件判断 */}
        { this.Vif() }

        {/* v-for 循环 */}
        <ul>
          {
            [1,2,3].map(item=> <li key={item}> {`${item} 分支`} </li>)
          }
        </ul>

        {/* 点击事件 */}
        <div>
          <button onClick={this.clickHandle}>按钮</button>
        </div>
      </div>
    );
  }
};
```


#v-bind：使用大括号{}进行包裹

```js
export default defineComponent({
  setup() {
    let text = '我是文本内容'
    let style = {
      background: 'red'
    }
    return () => (<>
      <div style={style} >{text}</div>
      <button onClick={() => { alert('您点击了我') }}>点我</button>
    </>)
  }
})

```



datas：为任意数据类型，作为数据例子

## 1、v-model
```
<div v-model="datas">v-mode指令：vue的写法</div>
<!-- vue的写法 -->


<div v-model={datas}>v-mode指令：jsx的写法</div>
{/* jsx的写法 */}
```



## 2、v-if 的三目表达式

（多级可进行多层的嵌套判断）
```
<div v-if="datas">v-if的成功判断</div>
<!-- vue的写法 -->


{datas ? (<div></div>) : null}
{/* jsx的写法 */}
```

使用v-if、v-else-if 与 v-else配合。

```js
export default{
	data(){
		return {
			num:1
		}
	},
	render(){
		return (
			<div>
				<span>{ this.num } </span>
				{ 
					if(this.num === 1) {
						return <span>{ 分支1 } </span>
					}else if(this.num === 2){
						return <span>{ 分支2 } </span>
					}else{
						return <span>{ 分支3 } </span>
					}
				}
			</div>
		)
	}
}
```



## 3、v-show
```
<div v-show="datas"></div>
<!-- vue的写法 -->


<div v-show={datas}>这里是v-show的成功判断</div>
{/* jsx的写法 */}
```





## 4、v-for
```
<div v-for="(item, index) in datas">
    <div :key="index">
        {{ item.name }}: {{ item.value }}
    </div>
</div>
<!-- vue的写法 -->

{datas.map((item: any, index: number) => {
    return (
        <div key={index}>
            {item.name}: {item.value}
        </div>
    );
})}
{/* tsx的写法 */}
```





## 5、点击事件：v-on、@
```
<div @click="click"></div>
<div @change="change"></div>
<!-- vue的写法 -->


<div onClick={click}></div>
<div onChange={change}></div>
{/* jsx的写法 */}
```





## 6、Element UI 的部分指令

（1）el-form 的model 、 插槽v-slots
```
<el-form
   ref="from"
   labelWidth="100px"
   :model="from"
   :rules="rules">
    <el-form-item label="名字: ">
        <el-input v-model="from.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄: ">
        <el-input v-model="from.name"></el-input>
    </el-form-item>
</el-form>
<!-- vue的写法 -->


<el-form labelWidth="100px" props={{ model: from }}>
    <el-form-item
        v-slots={{
            label: () => {
                return (
                    <>
                    <span>{'名字：'}</span>
                    </>
                );
            },
        }}
        >
        <el-input v-model={from.name}></el-input>
    </el-form-item>
    <el-form-item label={'年龄: '}>
        <el-input v-model={from.age}></el-input>
    </el-form-item>
</el-form>
{/* tsx的写法 */}
```





（2）v-loading.fullscreen.lock 加载状态
```
<div
     class="upload-progress"
     v-loading.fullscreen.lock="datas"
     element-loading-text="拼命配置中..."
     element-loading-background="rgba(255, 255, 255, 0.35)"
 ></div>
<!-- vue的写法 -->


<div
    class="upload-progress"
    v-loading_fullscreen_lock={datas} // 改下划线_ 连接
    element-loading-text="拼命配置中..."
    element-loading-background="rgba(255, 255, 255, 0.35)"
 ></div>
{/* tsx的写法 */}
```





（3）el-tree 中的@node-click :data="data" :props="defaultProps"
特别提示： onClick={ 这里写的是函数，而不是变量变量，有的同学一直在这里写变量，导致函数一直无法响应 }

```
const fun = () =>{}
// 错误写法
onClick={fun}
// 正确写法,
onClick={() => { fun }}
```

以下是转化代码：
```
interface Tree {
  label: string;
  children?: Tree[];
}
const handleNodeClick = (data: Tree, node: any, obj: any) => {
    console.log(data, node, obj);
};
const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
           {
             label: 'Level three 1-1-1',
           },
        ],
      },
    ],
  },
]
const defaultProps = {
  children: 'children',
    label: 'label',
};

<!-- vue template 写法 -->
<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />

{/* tsx的写法 */}
<el-tree
   data={data}
   props={defaultProps}
   onNodeClick={(e: any, node: any, obj: any) => {
      handleNodeClick(e, node, obj);
   }}
/>
{/* 点击事件效果，如下图6-1所示 */}
```

将@node-click转化成onNodeClick（或者onNode-click 也可以，但不规范，有时也不生效）
传参问题：事件node-click有三个回调参数，三个参数：对应于节点点击的节点对象， TreeNode 节点 属性，事件对象





## 7、v-text
```
<div v-text="'v-text文本指令'"></div>
<!-- 渲染出：v-text文本指令 -->
​
<!-- vue的写法 -->


<div v-text={'v-text文本指令'}>111</div>
{/* 渲染出：v-text文本指令 */}
​
{/* jsx的写法 */}
```





## 8、v-html
```
<div v-html='<div>v-html指令</div>'></div>
<!-- 渲染出：v-html指令 -->
​
<!-- vue的写法 -->


<div v-html={'<div>v-html指令</div>'}>111</div>
{/* 渲染出：v-html指令 */}
​
{/* jsx的写法 */}
```





## 9、v-bind
```
<div :rules="rules"></div>
<!-- vue的写法 -->


<div rules={datas}></div>
{/* jsx的写法 */}
```




## 10、v-slot 插槽
```
<el-form-item label="名字:" >
    <el-input v-model={from.name}></el-input>
</el-form-item>
<!-- vue的写法 -->


<el-form-item
    v-slots={{
        label: () => { //label 代表对应的插槽名称，有默认插槽，具名插槽、自定义插槽
            return (
                <>
                <span>{'名字：'}</span>
                </>
            );
        },
    }}
    >
    <el-input v-model={form.name}></el-input>
</el-form-item>
​
{/* jsx的写法 */}
```



 v-slots 动态插槽函数封装
 ```
 interface Form {
     name?: string;
     age?: number;
     job?: string;
  }
  const form: Form = reactive({
     name: '张三',
     age: 30,
     job: '开发工程师',
  });
 
 {/*插槽函数，可拓展为插槽类型推断，参数备注： str: 插槽值, type: 插槽名称 */}
 const slots = (str: string, type = 'default') => {
     return {
         [type]: () => {
             return (
                 <div>
                     <span>{str}</span>
                 </div>
             );
         },
     };
 };
 
 <el-form labelWidth="100px" props={{ model: form}}>
    <el-form-item
       v-slots={{
           label: () => {
              return (
                 <>
                   <span>{'名字：'}</span>
                 </>
              );
           },
       }}
     >
     <el-input v-model={form.name}></el-input>
  </el-form-item>
  <el-form-item label={'年龄：'}>
    <el-input v-model={form.age}></el-input>
  </el-form-item>
 
  {/* 动态插槽函数调用 */}
  <el-form-item v-slots={slots('职业：', 'label')}>
     <el-input v-model={form.job}></el-input>
  </el-form-item>
 </el-form>
 
 {/* tsx的写法 */}
 ```