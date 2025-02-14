```

    /**
     * @description 侵入函数
     */
    $_invadeMethods(methods) {
      if (!methods) return;
      const { _codeString } = methods;
      if (!_codeString) return;
      const codeString = atou(_codeString);
      // 构造 methods 对象:
      const tmpl = `({${codeString}})`;
      try {
        const methodsObj = eval(tmpl);
        // console.log("codeString: ", methodsObj);
        if (methodsObj && typeof methodsObj == "object") {
          for (const method in methodsObj) {
            if (Object.hasOwnProperty.call(methodsObj, method)) {
              const fn = methodsObj[method].bind(this);
              Object.defineProperty(this, method, {
                get() {
                  return fn;
                },
              });
            }
          }
        }
      } catch (error) {
        console.group("代码增强--函数: 代码片段解析失败!");
        console.error(error);
        console.log("code: ", codeString);
        console.groupEnd();
      }
    },
```

通过上述方法，把在线写的表格各钩子函数的增强统一挂在到this上

