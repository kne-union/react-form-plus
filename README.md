
# react-form-plus


### 描述

补充和增强react-form功能


### 安装

```shell
npm i --save @kne/react-form-plus
```

### 示例


#### 示例样式

```scss
.table-list {
  .ant-card-body {
    padding: 0;
  }

  .react-form__field-label {
    display: none;
  }

  .react-form__field {
    margin-bottom: 0 !important;
  }

  .ant-row:not(:last-child) {
    border-bottom: solid 1px var(--bg-color-grey-3);
  }

  .ant-row:hover {
    background: var(--bg-color-grey-1) !important;
  }

  .ant-col {
    padding: 16px;
    width: var(--col-width);
  }

  .options {
    flex-basis: 100px;
  }
}

.table-list-header {
  background: var(--bg-color-grey-1);

  .is-req:before {
    color: var(--color-warning);
    content: "*";
    position: static;
    display: inline-block;
    margin-right: 4px;
    font-weight: bold;
  }

  :global {
    .ant-col {
      padding: 8px 16px;
    }
  }
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd)

```jsx
const {default: FormInfo} = _ReactFormPlus;
const {default: Form, Input, TextArea} = ReactForm;
const {Row, Col} = antd;

const BaseExample = () => {
    return <Form>
        <FormInfo list={[<Input name="name" label="名称" rule="REQ"/>, <Input name="field1" label="字段1" rule="REQ"/>,
            <Input name="field2" label="字段2" rule="REQ"/>, <Input name="field3" label="字段3" rule="REQ"/>,<TextArea name="description" label="描述" block/>]}
                  itemRender={(children, props) => {
                      return <Col span={props.span}>{children}</Col>;
                  }}>{(children) => {
            return <Row gutter={[24, 0]}>
                {children}
            </Row>
        }}</FormInfo>
    </Form>;
};

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd)

```jsx
const {default: FormInfo, SubList} = _ReactFormPlus;
const {default: Form, Input, TextArea} = ReactForm;
const {Row, Col, Button, Card, Empty, Flex} = antd;

const BaseExample = () => {
    return <Form debug>
        <SubList title="列表" itemTitle={({index}) => `项目${index + 1}`} empty={<Empty/>}
                 list={[<Input name="name" label="名称" rule="REQ"/>, <Input name="field1" label="字段1" rule="REQ"/>,
                     <Input name="field2" label="字段2" rule="REQ"/>, <Input name="field3" label="字段3" rule="REQ"/>,
                     <TextArea name="description" label="描述" block/>]} listRender={({list, ...props}) => {
            return <FormInfo list={list} itemRender={(children, props) => {
                return <Col span={props.span}>{children}</Col>;
            }} {...props}>{(children, {id, title, allowRemove, onRemove}) => {
                return <Card bordered={false} title={title} size="small"
                             extra={allowRemove && <Button type="link" danger onClick={onRemove}>删除</Button>}
                             key={id}>
                    <Row gutter={[24, 0]}>
                        {children}
                    </Row>
                </Card>
            }}</FormInfo>
        }}>{(children, {title, allowAdd, onAdd}) => {
            return <Card title={title} extra={allowAdd && <Button type="link" onClick={onAdd}>添加</Button>}>
                <Flex vertical gap={16}>
                    {children}
                </Flex>
            </Card>
        }}</SubList>
    </Form>;
};

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd)

```jsx
const {default: FormInfo, MultiField} = _ReactFormPlus;
const {default: Form, Input, TextArea} = ReactForm;
const {Row, Col, Button, Flex} = antd;

const BaseExample = () => {
    return <Form>
        <FormInfo
            list={[<MultiField name="name" label="名称" rule="REQ" field={Input} block maxLength={3}
                               itemRender={(children, {id, allowRemove, onRemove}) => {
                                   return <Row key={id}>
                                       <Col flex={1}>{children}</Col>
                                       <Col><Button type="link" disabled={!allowRemove} danger
                                                    onClick={onRemove}>删除</Button></Col>
                                   </Row>
                               }}>{(children, {allowAdd, onAdd}) => {
                return <div style={{marginBottom: 20}}>
                    {children}
                    <Flex justify="space-between">
                        <div></div>
                        {allowAdd && <Button type="dashed" onClick={onAdd}>添加</Button>}
                    </Flex>
                </div>
            }}</MultiField>, <Input name="field1" label="字段1" rule="REQ"/>,
                <Input name="field2" label="字段2" rule="REQ"/>, <TextArea name="description" label="描述" block/>]}
            itemRender={(children, props) => {
                return <Col span={props.span}>{children}</Col>;
            }}>{(children) => {
            return <Row gutter={[24, 0]}>
                {children}
            </Row>
        }}</FormInfo>
    </Form>;
};

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd)

```jsx
const {TableList} = _ReactFormPlus;
const {default: Form, Input, TextArea} = ReactForm;
const {Row, Col, Button, Card, Empty, Flex} = antd;

const BaseExample = () => {
    return <Form>
        <TableList title="表格表单" className="table-list" empty={<Empty/>} headerRender={(children, {width}) => {
            return <Row className="table-list-header" wrap={false} style={{
                "--col-width": width,
            }}>
                {children}
                <Col className="options"></Col>
            </Row>
        }} headerItemRender={(children, {id, isReq}) => {
            return <Col className={isReq ? "is-req" : ""} key={id}>{children}</Col>
        }} itemRender={(children) => {
            return <Col flex={1}>{children}</Col>;
        }} listRender={(children, {id, width, onRemove, allowRemove}) => {
            return <Row key={id} wrap={false} style={{
                "--col-width": width,
            }}>
                {children}
                <Col className="options"><Button type="link" onClick={onRemove} danger
                                                 disabled={!allowRemove}>删除</Button></Col>
            </Row>
        }} list={[<Input name="name" label="名称" rule="REQ"/>, <Input name="field1" label="字段1" rule="REQ"/>,
            <Input name="field2" label="字段2" />]}>{(children, {className, title, allowAdd, onAdd}) => {
            return <Card className={className} title={title} extra={allowAdd && <Button type="link" onClick={onAdd}>添加</Button>}>
                {children}
            </Card>
        }}</TableList>
    </Form>;
};

render(<BaseExample/>);

```


### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
|     |    |    |     |

