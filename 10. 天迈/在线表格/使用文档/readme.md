

**#**  `@tiamaes/cbb-online-table` **在线表格使用手册**

基于 Vue 的可视化表格设计器, 实现可视化操作生成简单通用的增删改查表格页面.



**特性**

- 基于数据库表生成增删改查表格
- 支持单表，树表，左树右表，主附表（一对一，一对多）
- 数据导出，导入
- 版本管理，版本回退
- 数据权限，数据规则
- 环境迁移（开发环境向生产环境迁移）
- 丰富的表单控件
- 支持表单自定义布局样式
- 代码增强，弹窗插件
- 表单控件注册扩展
- 配套的移动端H5应用





## 使用手册

设计方案管理：

![image-20240715163448379](img/readme/image-20240715163448379.png)





### 新增页面

点击管理页面的新增按钮

![img](https://indint.tiamaes.com/docs/assets/img/9.535a4fd8.png)

![image-20240715163633299](img/readme/image-20240715163633299.png)



进入设计器的第一个步骤：选择数据库表

![image-20240715163746233](img/readme/image-20240715163746233.png)



1.立刻启用版本： 环境迁移时生效的配置。例如测试环境向生产环境迁移的时候一般是批量迁移（多个页面）。迁移的过程中相当于在生产环境增加了一个新的版本，此配置项控制迁移后是否自动启动测试环境配好的生效版本。 在环境迁移章节会再详细介绍。本案例无需开启

2.启用流程： 搭配工作流使用时开启。开启后，此表格不在具有新增，编辑，删除功能。单行数据将代表的是工作流的流程，设计的表单表示工作流审批中的流程表单。 在工作流章节会详细介绍。本案例无需开启

3.功能说明：功能描述信息。【目前会影响到导出excel的名称】

4.数据连接：数据源选择。数据源列表的来源是数据源管理里的配置。

5.数据表选择：选择数据源后，选择数据库的表。 支持单表，多表。多表时第一个表表示主表，其他的表位附表。



本案例是简单的单表操作：

![image-20240715164724025](img/readme/image-20240715164724025.png)



选择表后，进入第二步：设计表单

![image-20240715164807871](img/readme/image-20240715164807871.png)



- 左侧位表单控件：基础控件，高级控件，系统控件，布局控件。 以及用户自行注册的业务扩展控件（后面章节详细介绍）
- 中间是控件画布：左侧控件拖拽到画布，画布可进行拖动排序，布局等操作。
- 右侧是属性配置面板：单个控件属性配置及表单整体属性配置，以及表单代码增强。



![image-20240715165422499](img/readme/image-20240715165422499.png)

右侧展示当前激活的控件的详细可视化配置：

1 组件属性：

1.1 公共配置：

- 唯一标识：随机生成的唯一ID，可用于代码增强里需要获取 ref 组件实例等。
- 数据库表：第一步设计时配置的数据库表。默认时主表，一对一的附表时，可切换为附表
- 控件字段：数据库表配置后，表字段选择。表示要入库的字段。如果是只在前端使用临时字段，可添加新的临时字符，表示虚拟字段不入库（在虚拟字段章节详细介绍）
- 控件名称：表单控件的左侧label

1.2 下方的其他配置，是当前控件特有的配置，不同类型控件拥有不同配置。

已当前的密码字段为例，输入框控件。有站位提示，默认值，前缀，是否是密码，是否制度，校验规则，脚本事件等配置

![image-20240715170857794](img/readme/image-20240715170857794.png)

输入框控件可以通过3个特有的事件触发自定义代码增强脚本，从而于其他控件进行交互。（代码增强后面章节详细介绍，此处暂不操作）

![image-20240715171014589](img/readme/image-20240715171014589.png)

1.3 下拉选择框控件

![image-20240715174919408](img/readme/image-20240715174919408.png)



1.3.1 下拉选择框数据选项配置：

- 静态数据：前端直接配置的静态选项数据，例如男女，等可枚举的固定选项。

  ![image-20240715175946673](img/readme/image-20240715175946673.png)

- 数据字典：动态数据来源（目前动态数据主要通过这种方式）。依赖M1 字典，需要所在项目启用 M1 字典服务。

![image-20240715175527700](img/readme/image-20240715175527700.png)

​	字典分为静态字典，动态字典（sql，http接口）

![image-20240715175717493](img/readme/image-20240715175717493.png)

![image-20240715175738743](img/readme/image-20240715175738743.png)

![image-20240715175750911](img/readme/image-20240715175750911.png)

- 其他表格：（实验室功能，开发测试中）从其他在线表格设计的方案里选择字段作为下拉选择数据来源。

  ![image-20240715180029647](img/readme/image-20240715180029647.png)

- 远程数据：（实验室功能，开发测试中）类型与postman直接配置接口访问配置，从接口拉取数据。受限于前端ajax跨域，此功能通过后端服务转发。

  ![image-20240715180240495](img/readme/image-20240715180240495.png)

  ![image-20240715180256245](img/readme/image-20240715180256245.png)

  

  1.4 高级控件

  ​	- 组织选择，用户选择，角色选择。 内置完整M1数据权限的数据选择器。

  ![image-20240715180836279](img/readme/image-20240715180836279.png)

  设计子表，独立子表 都是用于多表主附表操作，在主附表章节详细介绍。

  1.5 系统控件

  系统控件是指无需在前端通过用户手动填写，系统后台自动记录维护的数据。

  创建人员，创建时间，修改人员，修改时间，所属组织。

  1.6 布局控件

  控件容器，可以通过布局控件实现自定义的复杂结构布局，将表单控件拖到布局控件内部。

2 表单属性

![image-20240715171217689](img/readme/image-20240715171217689.png)

![image-20240715172714940](img/readme/image-20240715172714940.png)

表单弹窗：可选择居中弹窗，右侧弹窗，全屏弹窗 样式

![image-20240715171402209](img/readme/image-20240715171402209.png)

表单按钮：默认是弹窗展示表单，有确认，取消按钮（弹窗底部）。逻辑已内置可不更改。可根据业务配置是否展示。也可新增自定义按钮，实现自定义业务逻辑或者替换自带的确定。

![image-20240715173057506](img/readme/image-20240715173057506.png)

可配置是否开启按钮权限，按钮名称，及按钮代码增强。

权限开启后会在发布到资源菜单后生效。基于M1的权限管理进行分配。

按钮代码增强除了写js脚本外，内置了一些常见的可视化操作。在后面的可视化增强章节详细介绍。

![image-20240715173221453](img/readme/image-20240715173221453.png)



脚本事件：

onLoad： 表单加载后执行。可进行一些表达数据初始化，级联控制等操作。

beforeSubmit: 表单新增/编辑提交数据时触发，可进行数据提交前自定义格式化，数据拦截等操作。注意需返回Promise，resolve会正常走后续内置数据提交入库逻辑。reject 会拦截提交，不在执行后续逻辑，可用此做一些错误拦截等操作。

afterSubmit: 提交后触发。



第三步：列表设计

![image-20240715181432398](img/readme/image-20240715181432398.png)

右侧三项主要配置：

1 查询字段

![image-20240715182059640](img/readme/image-20240715182059640.png)

所勾选字段会出现在左侧，可配置查询时匹配类型，输入框类型默认是LIKE，选择框类型默认是=，时间默认是BETWEEN

![image-20240715182311758](img/readme/image-20240715182311758.png)



2 列表字段

![image-20240715182353612](img/readme/image-20240715182353612.png)

排序：支持正序，倒序。多个字段排序时可通过排序号进行权重设置

合计：数字类型的支持合计，会在表格渲染展示时显示合计（全部数据，不受分页影响）。如只需要当前页合计，可利用前端单页合计功能（后面章节介绍）

冻结：列左固定，右固定。 内置序号列左固定，操作栏右固定

单元格类型/格式化: 内置了常见类型的内容渲染格式。图片直接渲染成img标签，链接渲染会超级链接。HTML当做富文本渲染。以及时间格式化

![image-20240715183118292](img/readme/image-20240715183118292.png)

字段类型：表明后端服务字段类型。例如不能重复可设计值为编号（ID）

![image-20240715183358308](img/readme/image-20240715183358308.png)

3 列表属性

![image-20240715183604304](img/readme/image-20240715183604304.png)

3.1 展示样式

- 普通表格（常见的单表）

  ![img](https://indint.tiamaes.com/docs/assets/img/75.b0ecd58d.png)

- 左树右表（常用于左侧是分组，右侧是列表）

  ![img](https://indint.tiamaes.com/docs/assets/img/81.0c3cffe3.png)

- 树表 （常见的有父子关系，id，pid的树形表格）

![img](https://indint.tiamaes.com/docs/assets/img/76.e7b90cf9.png)

3.1.1 左侧树形+普通表格

![image-20240715184029953](img/readme/image-20240715184029953.png)

当选择左树右表布局时，需要进行左树配置。

数据来源支持3种：

- 数据字段：依赖M1字段服务，上同下拉选择数据来源字段配置。可以选择父子字典，渲染为树

  ![image-20240715184421377](img/readme/image-20240715184421377.png)

- 组织数据：M1内置的组织架构，类似于用户管理页面左侧的M1组织树

- 在线表格：其他在线表格设计的单表类型的表格（单表，树表。不能选择主附表作为左树来源）

  ![image-20240715184747030](img/readme/image-20240715184747030.png)

  ![image-20240715184829686](img/readme/image-20240715184829686.png)

  版本一般不选择，使用当前启用版本，这样当依赖的页面发送变动发布新版本时，这里的左树自动使用最新版依赖的页面。

  

  3.1.1.2 关联字段配置：

  ![image-20240715185228289](img/readme/image-20240715185228289.png)

  左树右表中的左树，是作为右边列表的搜索条件进行查询检索的。所需需要绑定一个字段，对此字段进行过滤查询。

  

  3.1.2 表格配置

  - 在线配置：开启后，管理员（开发者）可在预览页面进行列字段和搜索条件的在线启用配置，无需重新设计

  ![image-20240715185640728](img/readme/image-20240715185640728.png)

  

![image-20240715185655893](img/readme/image-20240715185655893.png)

- 高级查询：开启后，表格预览页面会出现高级综合查询

  ![image-20240715185815404](img/readme/image-20240715185815404.png)

  ![image-20240715185851202](img/readme/image-20240715185851202.png)

- 全量查询：开启后，表格预览时不分页，展示全量数据长列表。（支持大数据量数据虚拟滚动，无需担心卡顿）

- 分页设置：开启后，表格预览时可以选择分页大小

  ![image-20240715190116732](img/readme/image-20240715190116732.png)

  

- 子表样式：主附表时生效，子表在表格预览时的展示样式

  - 分组展示：附表字段也展示在列表列

    ![image-20240715190332982](img/readme/image-20240715190332982.png)

  - 折叠展示：附表会在主表展开折叠面板里展示

    ![image-20240715190445336](img/readme/image-20240715190445336.png)

- 复选框：开启后，表格展示时左侧会有复选框，通常搭配工具栏自定义按钮进行业务增强使用。

  ![image-20240715190645570](img/readme/image-20240715190645570.png)

- 展示序号：开启后，表格预览时左侧展示序号列

  ![image-20240715190746467](img/readme/image-20240715190746467.png)

  序号支持翻页后累加

  ![image-20240715190824847](img/readme/image-20240715190824847.png)

- 隐藏操作栏： 数据只是展示时，可以把操作栏隐藏

  ![image-20240715190957586](img/readme/image-20240715190957586.png)

- 隐藏重置按钮： 搜索栏的重置按钮可以不展示

  

3.1.3 按钮配置

![image-20240715191124045](img/readme/image-20240715191124045.png)

内置有 新增，编辑，删除，详情，批量删除，导入，导出功能。可根据业务需要开启隐藏，也可开始按钮权限（同上基于M1菜单按钮权限规则），重名名。



导出可进行字段设置：

![image-20240715191338203](img/readme/image-20240715191338203.png)



自定义按钮增强：

- 工具栏按钮

- 操作列按钮

  

  ![image-20240715191746566](img/readme/image-20240715191746566.png)

![image-20240715191837601](img/readme/image-20240715191837601.png)

3.1.4 后台服务增强

![image-20240715192009434](img/readme/image-20240715192009434.png)



## 数据权限

通过建立 数据规则 与 规则授权 的方式实现数据权限管理。

#### 新增数据规则

数据规则是针对已设计完成的表格页面的数据源(表), 控制数据是否要展示给用户的过滤条件

点击新增按钮, 表单中输入规则名称, 选择规则类型, 规则字段, 规则, 规则值等.

![img](https://indint.tiamaes.com/docs/assets/img/51.d4658222.png)

新增成功后, 列表更新.

![img](data:image/png;base64,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fAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgGMMnAAAAAAAAhjF8AgAAAAAAYBjDJwAAAAAAAIYxfAIAAAAAAGAYwycAAAAAAACGMXwCAAAAAABgkGn6f/G/SEske7WrAAAAAElFTkSuQmCC)

*同步版本时, 数据规则跟启用版本绑定. 即使设计版本中数据规则被删除, 历史版本中的数据规则都不会受影响*

编辑和删除没有特殊之处, 不再说明

## [#](https://indint.tiamaes.com/docs/ve/npm/tableGenerator/表格设计器使用手册.html#授权)授权

管理列表 -- 更多 -- 授权, 打开授权界面

左侧为角色组织用户选择器, 右侧为当前启用版本的数据规则列表.

![img](https://indint.tiamaes.com/docs/assets/img/45.372df6f7.png)

用户[天迈科技]未应用任何数据规则, 可以看到表的所有数据

![img](https://indint.tiamaes.com/docs/assets/img/46.61f3acba.png)

在授权界面为[天迈科技]用户应用数据规则[USERNAME 等于 111]

![img](https://indint.tiamaes.com/docs/assets/img/47.25a6e78a.png)

[天迈科技]用户再次访问页面时, 只能看到用户名是 111 的数据.

![img](https://indint.tiamaes.com/docs/assets/img/48.7dd4085b.png)



## 发布路由

管理页面 -- 操作 -- 更多 -- 发布路由

![img](https://indint.tiamaes.com/docs/assets/img/54.e4f7fda3.png)

表单字段说明:

- 资源名称: 默认为页面名称, 可以修改
- 上级菜单: 非必填, 要添加到哪个菜单下
- 访问路径: 会自动生成一个唯一路径, 可以手动修改, 但要注意唯一
- 备注: 非必填