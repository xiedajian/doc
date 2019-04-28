

[Egg.js中使用sequelize事务](https://www.jianshu.com/p/487584bd3a8f)




```

let transaction;
try {
  transaction = await this.ctx.model.transaction();
  await this.service.xxx.xxx(parms, transaction);
  await this.service.xxx.xxx(parms1, parms2, transaction);
  await transaction.commit();

  return true
} catch (e) {
  await transaction.rollback();

  return false
}

```