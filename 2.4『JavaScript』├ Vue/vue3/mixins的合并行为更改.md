
# mixins的合并行为更改
```
// mixin
export default {
    data() {
        return { name: 'zhang_san', age: 20 };
    }
};

// Vue2.x
export default {
    data() {
        return { age: 30 };
    },
    mounted() {
        console.log(this.$data); // {name: 'zhang_san', age: 30}
        console.log(this.name); // 'zhang_san'
        console.log(this.age); // 30
    }
};

// Vue3.x
export default {
    data() {
        return { age: 30 };
    },
    mounted() {
        console.log(this.$data); // { age: 30 }
        console.log(this.name); // 'zhang_san'
        console.log(this.age); // 30
    }
};
// 得出结论：1、与Vue2.x一样会覆盖掉mixins中相同的响应属性；2、Vue3.x中当前实例的$data是不会包含mixins中定义定响应属性。
```