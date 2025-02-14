

```
<avue-crud :option="option2" :data="data0" @search-change="searchChange"></avue-crud>



export default {
  data(){
    return {
       data0:[
         {
          text1:'文本1',
          text2:'文本2'
         }
       ],
       option2:{
          // searchIndex:3,
          searchIcon:true,
          column: [{
            label: '内容1',
            prop: 'text1',
            search:true,	// 是否出现在搜索栏
			searchTip:'我是一个默认提示语',
          },{
            label: '内容2',
            prop: 'text2',
            search:true,
          },{
            label: '内容3',
            prop: 'text3',
            search:true,
          },{
            label: '内容4',
            prop: 'text4',
            search:true,
          }]
       }
    }
  },
  methods:{
    searchChange(params,done) {
      done();
      this.$message.success(JSON.stringify(params));
    }
  }
}
```