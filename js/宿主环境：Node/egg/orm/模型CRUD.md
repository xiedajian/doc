
文档：http://docs.sequelizejs.com/manual/tutorial/models-usage.html

# 使用定义好的模型 model 来进行CRUD


## find - 在数据库中搜索一个特定元素

```
// search for known ids
Project.findById(123).then(project => {
  // project will be an instance of Project and stores the content of the table entry
  // with id 123. if such an entry is not defined you will get null
})

// search for attributes
Project.findOne({ where: {title: 'aProject'} }).then(project => {
  // project will be the first entry of the Projects table with the title 'aProject' || null
})


Project.findOne({
  where: {title: 'aProject'},
  attributes: ['id', ['name', 'title']]
}).then(project => {
  // project will be the first entry of the Projects table with the title 'aProject' || null
  // project.title will contain the name of the project
})
```


## findOrCreate - 搜索特定元素,不存在则创建它

## findAll - 在数据库中搜索多个元素

```
// find multiple entries
Project.findAll().then(projects => {
  // projects will be an array of all Project instances
})

// search for specific attributes - hash usage
Project.findAll({ where: { name: 'A Project' } }).then(projects => {
  // projects will be an array of Project instances with the specified name
})

// search within a specific range
Project.findAll({ where: { id: [1,2,3] } }).then(projects => {
  // projects will be an array of Projects having the id 1, 2 or 3
  // this is actually doing an IN query
})

```

## findAndCountAll - 在数据库中搜索多个元素，返回数据和总计数

这是一种结合的便捷方法，findAll并且count（见下文）这在处理与您希望使用a检索数据的分页相关的查询时非常有用limit，offset但也需要知道与查询匹配的记录总数：

成功处理程序将始终接收具有两个属性的对象：

- count - 由于关联而匹配where子句和其他过滤器的整数，总数记录
- rows - 一个对象数组，与where子句匹配的记录以及由于关联而在限制和偏移范围内的其他过滤器

```
Project
  .findAndCountAll({
     where: {
        title: {
          [Op.like]: 'foo%'
        }
     },
     offset: 10,
     limit: 2
  })
  .then(result => {
    console.log(result.count);
    console.log(result.rows);
  });
``