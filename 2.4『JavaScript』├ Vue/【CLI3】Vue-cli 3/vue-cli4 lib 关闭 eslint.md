实际上我们应该在.eslintrc.js文件中修改   删掉 “@vue/prettier” 就可以了

```
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential"], // "@vue/prettier"
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
```