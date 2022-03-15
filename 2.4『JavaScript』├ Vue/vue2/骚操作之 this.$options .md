

#  this.$options 

vue组件可以通过 this.$options 对象获取你编写的任何方法，比如 created( ) 生命周期函数，发现vue新玩法


# 重置vue组件的data数据

在vue单文件组件里有时需要重置data中的数据，比如表单填写一半，用户想重新填写。

```
<script>
    export default {
        data() {
            return {
                // 表单
                form: {
                    input: ''
                }
            }
        },
        ...
        methods: {
            // 重置表单方法
            retset() {
                this.form = this.$options.data().form;
            }
        },
        ...
    }
</script>
```


也可以通过给组件 $data 对象赋值来重置来重置整个 $data
```
this.$data = this.$options.data();
```


# 获取自定义属性

$options 也给我们自定义属性增加了无限可能

```
<script>
export default {
  myoption: 'myoption',
  data () {
    return {
      mydata: 11111,
      mydata1: 12345,
      mydata2: 44444,
      mydata3: 44444
    }
  },
  methods: {
    handleclick () {
      this.mydata = this.$options['myoption']
      this.mydata1 = this.$options.myoption
      this.mydata3 = this.$options['myoption1']
      this.$options.myoption1 = '888888'
      this.mydata3 = this.$options['myoption1']
    }
  }
}
</script>
```