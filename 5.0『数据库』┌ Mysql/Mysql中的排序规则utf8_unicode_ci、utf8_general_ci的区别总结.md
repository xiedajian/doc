


# Mysql中 utf8_general_ci 与 utf8_unicode_ci 有什么区别呢？

在编程语言中，通常用unicode对中文字符做处理，防止出现乱码，那么在MySQL里，为什么大家都使用utf8_general_ci而不是utf8_unicode_ci呢

ci是 case insensitive, 即 "大小写不敏感", a 和 A 会在字符判断中会被当做一样的;

bin 是二进制, a 和 A 会别区别对待.


例如你运行:
```
SELECT * FROM table WHERE txt = 'a'
```
那么在utf8_bin中你就找不到 txt = 'A' 的那一行, 而 utf8_general_ci 则可以.

utf8_general_ci 不区分大小写，这个你在注册用户名和邮箱的时候就要使用。
utf8_general_cs 区分大小写，如果用户名和邮箱用这个 就会照成不良后果
utf8_bin:字符串每个字符串用二进制数据编译存储。 区分大小写，而且可以存二进制的内容


utf8_general_ci 与 utf8_unicode_ci 有什么区别

如果你的应用有德语、法语或者俄语，请一定使用utf8_unicode_ci。一般用utf8_general_ci就够了。

*所以一般字符集用utf-8，排序规则用utf8_general_ci*