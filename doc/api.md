#### FieldList

表单字段列表组件，用于渲染一组表单字段，支持动态显示/隐藏、额外属性设置等功能。

| 属性                 | 类型                                     | 默认值  | 描述                               |
|--------------------|----------------------------------------|------|----------------------------------|
| `list`             | `Array<ReactElement>`                  | -    | **必填**，表单字段配置数组，每个元素是一个 React 元素 |
| `groupArgs`        | `Array<any>`                           | -    | 分组参数，传递给表单上下文                    |
| `ignoreFieldProps` | `string[]`                             | `[]` | 需要从字段 props 中忽略的属性名数组            |
| `itemRender`       | `(children, targetProps) => ReactNode` | -    | 字段渲染函数，用于自定义每个字段的渲染方式            |

**字段元素支持的额外属性**：

- `display`: `boolean | (contextApi) => boolean` - 控制字段是否显示，支持函数形式动态控制
- `block`: `boolean` - 是否占据整行
- `hidden`: `boolean` - 是否隐藏（隐藏字段仍会渲染，只是不可见）
- `isBlock`: `boolean` - 同 block，用于兼容
- `setExtraProps`: `(params) => object` - 动态设置字段额外属性的函数

#### FormInfo

表单信息组件，基于 FieldList 封装，提供列布局支持。

| 属性           | 类型                                     | 默认值 | 描述                      |
|--------------|----------------------------------------|-----|-------------------------|
| `list`       | `Array<ReactElement>`                  | -   | **必填**，表单字段配置数组         |
| `column`     | `number`                               | `2` | 列数，用于计算字段宽度             |
| `groupArgs`  | `Array<any>`                           | -   | 分组参数，传递给 FieldList      |
| `itemRender` | `(children, targetProps) => ReactNode` | -   | 字段渲染函数                  |
| `children`   | `(content, others) => ReactNode`       | -   | **必填**，内容渲染函数，用于自定义整体布局 |

**targetProps 包含**：

- `span`: 计算后的栅格宽度（基于 column 和 block）
- `block`: 是否占据整行
- `props`: 字段的原始 props

#### MultiField

多字段组件，用于实现动态增减同类型字段的功能。

| 属性              | 类型                                 | 默认值     | 描述                 |
|-----------------|------------------------------------|---------|--------------------|
| `name`          | `string`                           | -       | **必填**，字段名称        |
| `label`         | `ReactNode`                        | -       | 字段标签               |
| `rule`          | `string`                           | -       | 校验规则               |
| `field`         | `ComponentType`                    | -       | **必填**，字段组件类型      |
| `defaultLength` | `number`                           | `1`     | 默认字段数量             |
| `minLength`     | `number`                           | `0`     | 最小字段数量，少于此数量时不允许删除 |
| `maxLength`     | `number`                           | -       | 最大字段数量，达到此数量时不允许添加 |
| `reverseOrder`  | `boolean`                          | `false` | 是否反向排列（新字段添加到前面）   |
| `disabled`      | `boolean`                          | `false` | 是否禁用，禁用时禁止添加和删除    |
| `empty`         | `ReactNode`                        | -       | 空状态时显示的内容          |
| `itemRender`    | `(field, groupArgs) => ReactNode`  | -       | 单个字段渲染函数           |
| `children`      | `(content, controls) => ReactNode` | -       | **必填**，整体渲染函数      |

**controls 包含**：

- `allowAdd`: 是否允许添加
- `reverseOrder`: 是否反向排列
- `onAdd`: 添加字段的函数，支持 `{ isUnshift: boolean }` 参数

#### SubList

子列表组件，用于实现嵌套表单结构，每个子项可以包含多个字段。

| 属性              | 类型                                   | 默认值                     | 描述              |
|-----------------|--------------------------------------|-------------------------|-----------------|
| `name`          | `string`                             | -                       | **必填**，字段名称     |
| `list`          | `Array<ReactElement>`                | `Function`              | -               | **必填**，字段配置数组或动态生成函数 |
| `itemTitle`     | `ReactNode`                          | `(params) => ReactNode` | -               | 子项标题，支持函数动态生成 |
| `column`        | `number`                             | `2`                     | 列数              |
| `defaultLength` | `number`                             | `1`                     | 默认子项数量          |
| `minLength`     | `number`                             | `0`                     | 最小子项数量          |
| `maxLength`     | `number`                             | -                       | 最大子项数量          |
| `reverseOrder`  | `boolean`                            | `false`                 | 是否反向排列          |
| `empty`         | `ReactNode`                          | -                       | 空状态显示内容         |
| `listRender`    | `(props) => ReactNode`               | -                       | **必填**，单个子项渲染函数 |
| `beforeAdd`     | `(name, context, params) => boolean` | `void`                  | -               | 添加前的回调，返回 false 阻止添加 |
| `afterDelete`   | `(...groupArgs) => void`             | -                       | 删除后的回调          |
| `children`      | `(content, controls) => ReactNode`   | -                       | **必填**，整体渲染函数   |

**listRender 的 props 包含**：

- `id`: 子项 ID
- `column`: 列数
- `list`: 字段列表
- `title`: 子项标题
- `groupArgs`: 分组参数
- `allowRemove`: 是否允许删除
- `onRemove`: 删除函数

**children 的 controls 包含**：

- `allowAdd`: 是否允许添加
- `onAdd`: 添加函数
- `dataLength`: 当前数据长度

#### TableList

表格表单组件，以表格形式展示动态表单列表。

| 属性                 | 类型                                     | 默认值                     | 描述          |
|--------------------|----------------------------------------|-------------------------|-------------|
| `name`             | `string`                               | -                       | **必填**，字段名称 |
| `list`             | `Array<ReactElement>`                  | `Function`              | -           | **必填**，表格列配置数组 |
| `defaultLength`    | `number`                               | `1`                     | 默认行数        |
| `minLength`        | `number`                               | `0`                     | 最小行数        |
| `maxLength`        | `number`                               | -                       | 最大行数        |
| `reverseOrder`     | `boolean`                              | `false`                 | 是否反向排列      |
| `empty`            | `ReactNode`                            | -                       | 空状态显示内容     |
| `itemTitle`        | `ReactNode`                            | `(params) => ReactNode` | -           | 行标题 |
| `headerRender`     | `(headers, props) => ReactNode`        | -                       | 表头渲染函数      |
| `headerItemRender` | `(label, props) => ReactNode`          | -                       | 表头单元格渲染函数   |
| `listRender`       | `(content, props) => ReactNode`        | -                       | 行内容渲染函数     |
| `itemRender`       | `(children, targetProps) => ReactNode` | -                       | 单元格渲染函数     |
| `beforeAdd`        | `(name, context, params) => boolean`   | `void`                  | -           | 添加前的回调 |
| `afterDelete`      | `(...groupArgs) => void`               | -                       | 删除后的回调      |
| `children`         | `(inner, others) => ReactNode`         | `inner => inner`        | 整体渲染函数      |
