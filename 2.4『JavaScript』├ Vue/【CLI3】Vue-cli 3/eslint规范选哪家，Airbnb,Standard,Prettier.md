
[eslint代码格式化prettier和standard规则比较（为什么推荐使用prettier）](https://www.cnblogs.com/1549983239yifeng/p/14360708.html)


应用了 ESLint 后，通常是需要自己来配置繁杂的 rules 规则，这也是一个喜好类的东西，多数人是不愿意在这上面耗费太多精力的（比如手动配置数百个ESLint 规则），于是github 上出现了一些开源的代码规范库，

比较流行的有 airbnb、standard、recommended、prettier等



规则强度是 airbnb > standard > recommended

recommended 和 standard 大概有 88 出不同，主要是 recommended 很多都是 off, standard 是 error, 同时 standard 还有很多特有的规则。 



# standard、prettier 推荐 prettier

 [详情可参考：](https://www.cnblogs.com/1549983239yifeng/p/14360708.html)

因为 prettier 的规则比较少所以需要补配一个 eslint:recommended 推荐规则




# 询问项目的什么时候校验格式

- lint on save
- lint and fix on commit

区别：

lint on save：
代码文件中有代码不符合 lint 规则时，会在 compile 阶段提示 warning。如果出现了语法错误，会直接在页面上显示 error

int and fix on commit

代码除了语法错误导致的 error 外不会提示 warning。而是在当前项目进行 git commit 操作的时候，通过 githook，在 pre-commit 阶段执行 lint 和 fix 操作，自动帮我们把有语法错误的地方修改为符合规范。


