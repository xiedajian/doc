

# Node Sass 弃用，以 Dart Sass 代替


2020年10月，Sass 官方团队正式宣布 Libsass 将弃用，以及基于它的 Node Sass 和 SassC，并且建议用户使用 Dart Sass。


- 不再建议将 LibSass 用于新的 Sass 项目， 改为使用 Dart Sass


LibSass 与 DartSass 相比有两个主要优点：
可移植性：由于它是用 C++ 编写的，因此可以轻松地将 LibSass 嵌入其他编程语言中并提供原生(native-feeling) API。
性能：通过 C++ API 调用 LibSass 与使用脚本语言直接编写代码的速度相比非常快。 特别是，这意味着 LibSass 在 JavaScript 中比 Dart Sass 编译为 JS 的库速度要快得多（尽管它可与 Dart Sass 的命令行可执行文件相媲美）。


