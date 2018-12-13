
# utf8 与 utf8mb4 异同

 MySQL在 5.5.3 之后增加了 utf8mb4 字符编码，mb4即 most bytes 4。
 
 简单说 utf8mb4 是 utf8 的超集并完全兼容utf8，能够用四个字节存储更多的字符。
 
 
 
 但抛开数据库，标准的 UTF-8 字符集编码是可以用 1~4 个字节去编码21位字符，
 
 这几乎包含了是世界上所有能看见的语言了。
 
 然而在MySQL里实现的utf8最长使用3个字节，
 
 也就是只支持到了 Unicode 中的 基本多文本平面 （U+0000至U+FFFF），
 
 包含了控制符、拉丁文，中、日、韩等绝大多数国际字符，但并不是所有，
 
 最常见的就算现在手机端常用的表情字符 emoji和一些不常用的汉字，如 “墅” ，
 
 这些需要四个字节才能编码出来。

注：QQ里面的内置的表情不算，它是通过特殊映射到的一个gif图片。一般输入法自带的就是。
 
 
也就是当你的数据库里要求能够存入这些表情或宽字符时，可以把字段定义为 utf8mb4，

同时要注意连接字符集也要设置为utf8mb4，

否则在 严格模式 下会出现  Incorrect string value: /xF0/xA1/x8B/xBE/xE5/xA2… for column ‘name‘ 这样的错误，

非严格模式下此后的数据会被截断。



# utf8mb4_ unicode_ ci 与 utf8mb4_ general_ ci 如何选择

字符除了需要存储，还需要排序或比较大小，涉及到与编码字符集对应的 排序字符集（collation）。

ut8mb4对应的排序字符集常用的有 utf8mb4_unicode_ci 、 utf8mb4_general_ci ，

到底采用哪个在 stackoverflow 上有个讨论， What’s the difference between utf8_general_ci and utf8_unicode_ci

主要从排序准确性和性能两方面看：

## 准确性

utf8mb4_unicode_ci 是基于标准的Unicode来排序和比较，能够在各种语言之间精确排序

utf8mb4_general_ci 没有实现Unicode排序规则，在遇到某些特殊语言或字符是，

排序结果可能不是所期望的。

但是在绝大多数情况下，这种特殊字符的顺序一定要那么精确吗。

比如Unicode把 ? 、 ? 当成 ss 和 OE 来看；而general会把它们当成 s 、 e ，

再如 àá??ā? 各自都与  A 相等。


## 性能

utf8mb4_general_ci 在比较和排序的时候更快

utf8mb4_unicode_ci 在特殊情况下，

Unicode排序规则为了能够处理特殊字符的情况，实现了略微复杂的排序算法。

但是在绝大多数情况下，不会发生此类复杂比较。

general理论上比Unicode可能快些，但相比现在的CPU来说，

它远远不足以成为考虑性能的因素，索引涉及、SQL设计才是。
 
我个人推荐是 utf8mb4_unicode_ci ，将来 8.0 里也极有可能使用变为默认的规则。



这也从另一个角度告诉我们，不要可能产生乱码的字段作为主键或唯一索引。

我遇到过一例，以 url 来作为唯一索引，但是它记录的有可能是乱码，

导致后来想把它们修复就特别麻烦。
