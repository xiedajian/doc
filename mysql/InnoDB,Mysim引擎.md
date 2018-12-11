



MySQL数据库有多种存储引擎：

比如：MyISAM、InnoDB、MERGE、MEMORY(HEAP)、BDB(BerkeleyDB)、EXAMPLE、FEDERATED、ARCHIVE、CSV、BLACKHOLE等等，

最常见的也就是MyISAM和InnoDB了，下面主要讲解下MyISAM和InnoDB两种mysql数据库存储引擎的区别。



# Mysim引擎

mysql默认的数据库引擎是MyISAM,



事务： MyISAM类型的表强调的是性能，其执行速度比InnoDB类型更快，但是不提供事务支持

锁： 表锁

具体行数：select count(*) from table,  MyISAM只要简单的读出保存好的行数，注意的是，当count(*)语句包含 where条件时，两种表的操作是一样的

FULLTEXT类型的索引: Mysim引擎支持FULLTEXT类型的索引



# InnoDB,

事务： InnoDB提供事务支持事务，外部键等高级数据库功能

锁： 行锁

具体行数：InnoDB 中不 保存表的具体行数，也就是说，执行select count(*) from table时，InnoDB要扫描一遍整个表来计算有多少行

FULLTEXT类型的索引: InnoDB不支持FULLTEXT类型的索引




# InnoDB和MyISAM的区别 

MyISAM 是MySQL中默认的存储引擎，一般来说不是有太多人关心这个东西。

决定使用什么样的存储引擎是一个很tricky的事情，但是还是值我们去研究一下，这里的文章只考虑 MyISAM 和InnoDB这两个，因为这两个是最常见的。 

InnoDB和MyISAM是许多人在使用MySQL时最常用的两个表类型，这两个表类型各有优劣，视具体应用而定。


下面先让我们回答一些问题： 


你的数据库有外键吗？ 
你需要事务支持吗？ 
你需要全文索引吗？ 
你经常使用什么样的查询模式? 
你的数据有多大？ 


思考上面这些问题可以让你找到合适的方向，但那并不是绝对的。

如果你需要事务处理或是外键，那么InnoDB 可能是比较好的方式。

如果你需要全文索引，那么通常来说 MyISAM是好的选择，因为这是系统内建的，

然而，我们其实并不会经常地去测试两百万行记录。

所以，就算是慢一点，我们可以通过使用Sphinx从 InnoDB中获得全文索引。 