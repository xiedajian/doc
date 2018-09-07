
官网文档： https://dev.mysql.com/doc/refman/5.7/en/data-types.html

# MySQL 中的数据类型介绍

MySQL支持39种(按可使用的类型字段统计，即同义词也作多个)数据类型


## 概述

要了解一个数据库，我们也必须了解其支持的数据类型。

MySQL支持所有标准的SQL数据类型，主要分3类:

- 数值类型
- 字符串类型
- 时间日期类型
  
另一类是几何数据类型，用的不多，也没多介绍。   

# 1.数值类型

## 1.1 整数类型

```
类型            存储（Bytes）   最小值                  最大值
TINYINT         1               -128                    127
SMALLINT        2               -32768                  32767
MEDIUMINT       3               -8388608                8388607
INT             4               -2147483648             2147483648
BIGINT          8               -9223372036854775808    9223372036854775807
```

如果设置为 Unsigned（无符号）则表示的返回为从 0 到 最大值*2 这样的范围

## 1.2 浮点数

MySql中的浮点类型有float，double和real

他们定义方式为：FLOAT(M,D) 、 REAL(M,D) 、 DOUBLE PRECISION(M,D)

“(M,D)”表示该值一共显示M位整数，其中D位位于小数点后面

例如，定义为FLOAT(7,4)的一个列可以显示为-999.9999



# 2. 字符串类型

## 2.1 CHAR 和 VARCHAR 类型

CHAR和VARCHAR类型声明的长度表示你想要保存的最大字符数。默认长度都为255

例如，CHAR(30)可以占用30个字符。

CHAR列的长度固定为创建表时声明的长度。

VARCHAR列中的值为可变长字符串。长度可以指定为0到65,535之间的值
实际可指定的最大长度与编码和其他字段有关，比如，本人MySql使用utf-8编码格式，大小为标准格式大小的2倍，仅有一个varchar字段时实测最大值仅21844，如果添加一个char(3)，则最大取值减少3。整体最大长度是65,532字节）。


## 2.2 BINARY 和 VARBINARY 类型

BINARY和VARBINARY类型类似于CHAR和VARCHAR类型，但是不同的是，它们存储的不是字符字符串，而是二进制串。所以它们没有字符集，并且排序和比较基于列值字节的数值值。


## 2.3 BLOB 和 TEXT 类型

BLOB是一个二进制大对象，可以容纳可变数量的数据。有4种BLOB类型：TINYBLOB、BLOB、MEDIUMBLOB和LONGBLOB。它们只是可容纳值的最大长度不同。

TEXT有4种类型：TINYTEXT、TEXT、MEDIUMTEXT 和 LONGTEXT ,都是表示数据长度类型的一种.text不设置长度， 当不知道属性的最大长度时，适合用text

*按照查询速度： char最快， varchar次之，text最慢*



# 3. ENUM 枚举类型

声明为 ENUM 枚举类型的字段，取值只能在枚举范围内

```
CREATE TABLE shirts (
name VARCHAR(40),
sex ENUM('男', '女')
);
```


# 4. SET 类型




# 5. 时间日期类型

## 5.1 DATE, DATETIME, 和 TIMESTAMP 类型

这三者其实是关联的，都用来表示日期或时间

当你需要同时包含日期和时间信息的值时则使用DATETIME类型. MySQL以'YYYY-MM-DD HH:MM:SS'格式检索和显示.支持的范围为'1000-01-01 00:00:00'到'9999-12-31 23:59:59'。

当你只需要日期值而不需要时间部分时应使用DATE类型。MySQL用'YYYY-MM-DD'格式检索和显示DATE值.支持的范围是'1000-01-01'到 '9999-12-31'。

TIMESTAMP类型同样包含日期和时间，范围从'1970-01-01 00:00:01' UTC 到'2038-01-19 03:14:07' UTC


## 5.2 TIME类型

MySQL以'HH:MM:SS'格式检索和显示TIME值


## YEAR类型

MySQL以YYYY格式检索和显示YEAR值。范围是1901到2155

