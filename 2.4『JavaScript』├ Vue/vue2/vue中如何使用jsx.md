


# 如果是babel7.x那么需要安装如下插件：

```
npm i @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props -D
```

配置的babel.config.js:
```
module.exports = {
  presets: [
    [
      '@vue/babel-preset-jsx',
      {
        vModel: false,
        compositionAPI: true,
      },
    ],
  ],
}
```


# 如果是babel6.x那么需要安装如下插件：

```
npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-env\
  --save-dev
```

babelrc:
```
{
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
}
```



# 使用语法

```js
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      text: "Hello World!",
      msgClass: "msg-class",
      isGreen: true
    };
  },
  methods: {
    // 改变button按钮数量
    changeNum(val) {
      this.count = val;
    }
  },
  render() {
    const { count, text } = this; // 解构
    return (
      <div class="hello-world-content">
        <p style="color:red">{text}</p>
        <p class={this.msg ? this.msgClass : ""}>动态绑定class,传递过来的消息：{this.msg}</p>
        <p style={this.isGreen ? "color: green" : ""}>动态绑定style,传递过来的消息：{this.msg}</p>
        <input placeholder="placeholder属性"></input>
        <ButtonCounter style={{ marginTop: "20px" }} count={count} onChangeNum={this.changeNum}></ButtonCounter>
      </div>
    );
  }
};
```