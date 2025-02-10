
# Decorator 装饰器

- 使用@符号,用来扩展，修改类的行为
- 使用的时候需要引入第三方库 如： core-decorators

```
 const name = (target) => {
     target.name = "domesy"
 }
 
 @name
 class Test{}
 
 console.log(Test.name) //domesy

```