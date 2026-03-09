# react-form-plus

### 描述

补充和增强react-form功能

### 安装

```shell
npm i --save @kne/react-form-plus
```

### 概述

#### 核心功能
- 提供动态表单生成能力，支持多字段、子列表和表格列表的配置。
- 支持表单数据的动态渲染和交互。
- 支持表单数据的动态校验和提交。

#### 使用场景
- **动态表单生成**：根据配置快速生成表单，适用于需要动态调整表单字段的场景。
- **复杂表单结构**：支持嵌套子列表和表格列表，适用于需要复杂数据结构的表单。
- **数据交互**：支持表单数据的动态更新和提交，适用于需要实时交互的场景。

#### 主要模块
- **FieldList**: 基础字段列表组件，适用于简单的表单生成。
- **MultiField**: 多字段表单组件，适用于需要同时编辑多个字段的场景。
- **SubList**: 子列表表单组件，适用于需要嵌套表单的场景。
- **TableList**: 表格列表表单组件，适用于需要表格形式展示和编辑数据的场景。

### 示例

#### 示例样式

```scss
.table-list, .table-list-header {
  min-width: 800px;
}

.table-list {
  overflow: auto;

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

- FieldList 字段列表
- 展示 `FieldList` 组件的核心功能，包括动态显示/隐藏、字段属性设置等高级特性。
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd)

```jsx
const { FieldList } = _ReactFormPlus;
const { default: Form, Input, Select, TextArea } = ReactForm;
const { Row, Col, Button, Card, message, Divider, Flex } = antd;

const { useState } = React;

// 模拟真实的业务场景：动态表单字段控制
const BaseExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    age: '',
    phone: '',
    email: '',
    company: '',
    position: '',
    emergencyContact: '',
    emergencyPhone: '',
    remark: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('提交的数据:', data);
    message.success('提交成功');
    setLoading(false);
  };

  return (
    <Card title="FieldList 组件示例 - 动态表单字段">
      <Form data={formData} onSubmit={handleSubmit} debug>
        <FieldList
          list={[
            // 基础字段
            <Input name="name" label="姓名" rule="REQ" placeholder="请输入姓名" />,
            <Select
              name="gender"
              label="性别"
              rule="REQ"
              options={[
                { label: '男', value: 'male' },
                { label: '女', value: 'female' }
              ]}
            />,
            <Input name="age" label="年龄" placeholder="请输入年龄" />,
            <Input name="phone" label="联系电话" rule="REQ" placeholder="请输入手机号" />,
            <Input name="email" label="电子邮箱" rule="EMAIL" placeholder="请输入邮箱" />,

            // 动态显示字段 - display 函数
            <Input
              name="company"
              label="公司名称"
              placeholder="请输入公司名称"
              display={({ formData }) => formData.hasJob === true}
            />,
            <Input
              name="position"
              label="职位"
              placeholder="请输入职位"
              display={({ formData }) => formData.hasJob === true}
            />,

            // 隐藏字段 - hidden 属性
            <Input
              name="emergencyContact"
              label="紧急联系人"
              placeholder="请输入紧急联系人"
              hidden={({ formData }) => !formData.needEmergency}
            />,
            <Input
              name="emergencyPhone"
              label="紧急联系电话"
              placeholder="请输入紧急联系电话"
              hidden={({ formData }) => !formData.needEmergency}
            />,

            // 动态属性设置 - setExtraProps
            <Input
              name="remark"
              label="备注"
              placeholder="请输入备注信息"
              block
              setExtraProps={({ contextApi, props }) => {
                // 根据其他字段动态设置属性
                return {
                  disabled: !contextApi.formData.name,
                  placeholder: contextApi.formData.name
                    ? &#96;${contextApi.formData.name}的备注&#96;
                    : '请输入备注信息'
                };
              }}
            />
          ]}
          itemRender={(children, targetProps) => {
            const { block, hidden, display } = targetProps;
            
            // hidden 字段不显示但保留
            if (hidden) {
              return null;
            }

            // display 为 false 的字段不显示
            if (display === false) {
              return null;
            }

            return (
              <Col key={targetProps.key} span={block ? 24 : 12}>
                {children}
              </Col>
            );
          }}
          ignoreFieldProps={['customProp']}
        />

        <Divider />

        <Flex justify="end" gap={8}>
          <Button onClick={() => message.info('已取消')}>取消</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Flex>
      </Form>

      <Divider orientation="left">功能说明</Divider>
      
      <Card size="small" style={{ marginTop: 16 }}>
        <Flex vertical gap={8}>
          <div><strong>FieldList 组件特性：</strong></div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li><strong>display</strong>: 支持布尔值或函数，动态控制字段显示/隐藏</li>
            <li><strong>hidden</strong>: 隐藏字段但仍保留在表单中（不可见）</li>
            <li><strong>block</strong>: 占据整行，常用于文本域等</li>
            <li><strong>setExtraProps</strong>: 动态设置字段额外属性，可基于表单上下文</li>
            <li><strong>itemRender</strong>: 自定义每个字段的渲染方式</li>
            <li><strong>ignoreFieldProps</strong>: 忽略特定的字段属性，不传递给组件</li>
          </ul>
        </Flex>
      </Card>
    </Card>
  );
};

render(<BaseExample />);

```

- FormInfo 基础表单
- 展示 `FormInfo` 组件的完整功能，包括列布局、动态字段显示、表单提交等真实业务场景。
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd)

```jsx
const { default: FormInfo } = _ReactFormPlus;
const { default: Form, Input, TextArea, Select, RadioGroup } = ReactForm;
const { Row, Col, Button, Card, message, Divider, Flex } = antd;

const { useState } = React;

// 模拟真实的业务场景：用户信息表单
const BaseExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    phone: '',
    email: '',
    company: '',
    department: '',
    position: '',
    address: '',
    remark: ''
  });

  const [loading, setLoading] = useState(false);

  // 模拟提交数据
  const handleSubmit = async (formData) => {
    setLoading(true);
    // 模拟异步提交
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('提交的数据:', formData);
    message.success('提交成功');
    setLoading(false);
  };

  return (
    <Card title="员工信息登记表">
      <Form
        data={formData}
        onSubmit={handleSubmit}
        debug
      >
        <FormInfo
          list={[
            // 基本信息
            <Input name="name" label="姓名" rule="REQ" placeholder="请输入员工姓名" />,
            <RadioGroup
              name="gender"
              label="性别"
              rule="REQ"
              options={[
                { label: '男', value: 'male' },
                { label: '女', value: 'female' }
              ]}
            />,
            <Input name="phone" label="联系电话" rule="REQ" placeholder="请输入手机号码" />,
            <Input name="email" label="电子邮箱" rule="EMAIL" placeholder="请输入邮箱地址" />,

            // 工作信息 - 根据 hasJob 动态显示
            <Select
              name="company"
              label="所属公司"
              placeholder="请选择公司"
              display={({ formData }) => formData.hasJob !== false}
              options={[
                { label: '总公司', value: 'headquarters' },
                { label: '北京分公司', value: 'beijing' },
                { label: '上海分公司', value: 'shanghai' },
                { label: '深圳分公司', value: 'shenzhen' }
              ]}
            />,
            <Input
              name="department"
              label="部门"
              placeholder="请输入部门名称"
              display={({ formData }) => formData.hasJob !== false}
            />,
            <Input
              name="position"
              label="职位"
              placeholder="请输入职位名称"
              display={({ formData }) => formData.hasJob !== false}
            />,

            // 完整字段示例 - 展示 block 和 hidden
            <TextArea
              name="address"
              label="家庭住址"
              placeholder="请输入详细地址"
              block
            />,
            <TextArea
              name="remark"
              label="备注信息"
              placeholder="请输入备注"
              block
              hidden={({ formData }) => !formData.needRemark}
            />,

            // 动态设置字段属性
            <Input
              name="emergencyContact"
              label="紧急联系人"
              placeholder="请输入紧急联系人姓名"
              setExtraProps={({ contextApi }) => {
                // 根据其他字段动态设置属性
                return {
                  disabled: !contextApi.formData.phone
                };
              }}
            />
          ]}
          column={2}
          itemRender={(children, props) => {
            return <Col span={props.span}>{children}</Col>;
          }}
        >
          {(children) => {
            return (
              <Flex vertical gap={16}>
                <Divider orientation="left">基本信息</Divider>
                <Row gutter={[24, 0]}>
                  {children}
                </Row>
              </Flex>
            );
          }}
        </FormInfo>

        <Divider />

        <Flex justify="end" gap={8}>
          <Button onClick={() => message.info('已取消')}>取消</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};

render(<BaseExample />);

```

- SubList 子列表表单
- 展示 `SubList` 组件的完整功能，包括动态字段列表、数量限制、回调函数等，以教育经历管理为例。
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd),dayjs(dayjs)

```jsx
const { default: FormInfo, SubList } = _ReactFormPlus;
const { default: Form, Input, TextArea, Select, DatePicker } = ReactForm;
const { Row, Col, Button, Card, Empty, Flex, message, Divider, Space, Switch } = antd;

const { useState } = React;

// 模拟真实的业务场景：教育经历管理
const BaseExample = () => {
  const [formData, setFormData] = useState({
    educationList: [
      {
        schoolName: '清华大学',
        degree: 'master',
        major: '计算机科学与技术',
        startDate: dayjs('2015-09-01'),
        endDate: dayjs('2018-07-01'),
        description: '研究方向：人工智能与机器学习'
      },
      {
        schoolName: '北京大学',
        degree: 'bachelor',
        major: '软件工程',
        startDate: dayjs('2011-09-01'),
        endDate: dayjs('2015-07-01'),
        description: '主修课程：数据结构、算法设计、软件工程'
      }
    ]
  });

  const [config, setConfig] = useState({
    maxLength: 5,
    minLength: 1,
    reverseOrder: false,
    disabled: false
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async data => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('提交的教育经历:', data);
    message.success('保存成功');
    setLoading(false);
  };

  const degreeOptions = [
    { label: '博士', value: 'doctor' },
    { label: '硕士', value: 'master' },
    { label: '本科', value: 'bachelor' },
    { label: '专科', value: 'college' },
    { label: '高中', value: 'highschool' }
  ];

  return (
    <Card title="教育经历管理">
      <Flex vertical gap={16}>
        {/* 配置面板 */}
        <Card size="small" title="配置选项">
          <Flex gap={24} wrap>
            <Space>
              <span>禁用状态:</span>
              <Switch checked={config.disabled} onChange={checked => setConfig({ ...config, disabled: checked })} />
            </Space>
            <Space>
              <span>反向排列:</span>
              <Switch checked={config.reverseOrder} onChange={checked => setConfig({ ...config, reverseOrder: checked })} />
            </Space>
            <Space>
              <span>最少条数:</span>
              <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{config.minLength}</span>
            </Space>
            <Space>
              <span>最多条数:</span>
              <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{config.maxLength}</span>
            </Space>
          </Flex>
        </Card>

        <Form data={formData} onSubmit={handleSubmit} debug>
          <SubList
            name="educationList"
            title="教育经历"
            itemTitle={({ index, id }) => &#96;教育经历 ${index + 1}&#96;}
            column={2}
            defaultLength={1}
            minLength={config.minLength}
            maxLength={config.maxLength}
            reverseOrder={config.reverseOrder}
            empty={<Empty description="暂无教育经历，请添加" />}
            beforeAdd={(name, context, params) => {
              console.log('添加前回调:', { name, context, params });
              message.info('准备添加新的教育经历');
              return true; // 返回 false 可以阻止添加
            }}
            afterDelete={(id, index, onRemove, length) => {
              console.log('删除后回调:', { id, index, length });
              message.success('已删除该教育经历');
            }}
            list={(id, { index, onRemove, length }) => {
              // 动态生成字段列表
              return [
                <Input name="schoolName" label="学校名称" rule="REQ" placeholder="请输入学校名称" />,
                <Select name="degree" label="学历" rule="REQ" options={degreeOptions} placeholder="请选择学历" />,
                <Input name="major" label="专业" rule="REQ" placeholder="请输入专业名称" />,
                <DatePicker name="startDate" label="开始时间" rule="REQ" picker="month" />,
                <DatePicker name="endDate" label="结束时间" rule="REQ" picker="month" />,
                <TextArea name="description" label="描述" placeholder="请输入相关描述" block />
              ];
            }}
            listRender={({ list, id, title, allowRemove, onRemove, groupArgs, ...props }) => {
              return (
                <FormInfo
                  list={list}
                  itemRender={(children, props) => {
                    return <Col span={props.span}>{children}</Col>;
                  }}
                  {...props}>
                  {(children, { id, title, allowRemove, onRemove }) => {
                    return (
                      <Card
                        key={id}
                        bordered={false}
                        size="small"
                        title={title}
                        extra={
                          allowRemove &&
                          !config.disabled && (
                            <Button type="link" danger onClick={onRemove}>
                              删除
                            </Button>
                          )
                        }
                        style={{ marginBottom: 16, backgroundColor: '#fafafa' }}>
                        <Row gutter={[24, 0]}>{children}</Row>
                      </Card>
                    );
                  }}
                </FormInfo>
              );
            }}>
            {(children, { title, allowAdd, onAdd, dataLength }) => {
              return (
                <Card
                  title={title}
                  extra={
                    <Space>
                      <span style={{ color: '#999', fontSize: 12 }}>
                        当前 {dataLength} 条记录
                        {config.maxLength && &#96; / 最多 ${config.maxLength} 条&#96;}
                      </span>
                      {allowAdd && !config.disabled && (
                        <Button type="link" onClick={onAdd}>
                          添加教育经历
                        </Button>
                      )}
                      {!allowAdd && <span style={{ color: '#ff4d4f', fontSize: 12 }}>已达到最大数量</span>}
                    </Space>
                  }>
                  <Flex vertical gap={0}>
                    {children}
                  </Flex>
                </Card>
              );
            }}
          </SubList>

          <Divider />

          <Flex justify="end" gap={8}>
            <Button onClick={() => message.info('已取消')}>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Card>
  );
};

render(<BaseExample />);

```

- MultiField 多字段
- 展示 `MultiField` 组件的完整功能，包括动态增减、数量限制、反向排列等，以项目成员管理为例。
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd)

```jsx
const { default: FormInfo, MultiField } = _ReactFormPlus;
const { default: Form, Input, TextArea, Select } = ReactForm;
const { Row, Col, Button, Card, message, Divider, Flex, Switch, Space, Empty } = antd;

const { useState } = React;

// 模拟真实的业务场景：项目成员管理
const BaseExample = () => {
  const [formData, setFormData] = useState({
    projectName: '前端重构项目',
    members: ['张三', '李四']
  });

  const [config, setConfig] = useState({
    disabled: false,
    reverseOrder: false,
    minLength: 1,
    maxLength: 5
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async data => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('提交的项目数据:', data);
    message.success('保存成功');
    setLoading(false);
  };

  const roleOptions = [
    { label: '开发工程师', value: 'developer' },
    { label: 'UI设计师', value: 'designer' },
    { label: '产品经理', value: 'pm' },
    { label: '测试工程师', value: 'tester' }
  ];

  return (
    <Card title="项目成员管理">
      <Flex vertical gap={16}>
        {/* 配置面板 */}
        <Card size="small" title="配置选项">
          <Flex gap={24} wrap>
            <Space>
              <span>禁用状态:</span>
              <Switch checked={config.disabled} onChange={checked => setConfig({ ...config, disabled: checked })} />
            </Space>
            <Space>
              <span>反向添加:</span>
              <Switch checked={config.reverseOrder} onChange={checked => setConfig({ ...config, reverseOrder: checked })} />
            </Space>
            <Space>
              <span>最少人数:</span>
              <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{config.minLength}</span>
            </Space>
            <Space>
              <span>最多人数:</span>
              <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{config.maxLength}</span>
            </Space>
          </Flex>
        </Card>

        <Form data={formData} onSubmit={handleSubmit} debug>
          <FormInfo
            list={[
              <Input name="projectName" label="项目名称" rule="REQ" placeholder="请输入项目名称" />,

              <MultiField
                name="members"
                label="项目成员"
                field={Input}
                rule="REQ"
                placeholder="请输入成员姓名"
                disabled={config.disabled}
                reverseOrder={config.reverseOrder}
                minLength={config.minLength}
                maxLength={config.maxLength}
                defaultLength={2}
                empty={<Empty description="暂无成员，请添加" />}
                itemRender={(children, { id, index, allowRemove, onRemove }) => {
                  return (
                    <Row key={id} gutter={8} style={{ marginBottom: 8 }}>
                      <Col flex={1}>{children}</Col>
                      <Col>
                        <Button type="link" danger disabled={!allowRemove || config.disabled} onClick={onRemove}>
                          删除
                        </Button>
                      </Col>
                    </Row>
                  );
                }}>
                {(children, { allowAdd, reverseOrder, onAdd }) => {
                  return (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ marginBottom: 8, color: '#666' }}>{reverseOrder ? '新成员将添加到顶部' : '新成员将添加到底部'}</div>
                      {children}
                      <Flex justify="space-between" align="center">
                        <span style={{ color: '#999', fontSize: 12 }}>
                          当前已添加 {formData.members?.length || 0} 人{config.maxLength && &#96; / 最多 ${config.maxLength} 人&#96;}
                        </span>
                        {allowAdd && !config.disabled && (
                          <Space>
                            <Button type="dashed" onClick={() => onAdd()}>
                              添加
                            </Button>
                          </Space>
                        )}
                        {!allowAdd && <span style={{ color: '#ff4d4f', fontSize: 12 }}>已达到最大成员数量</span>}
                      </Flex>
                    </div>
                  );
                }}
              </MultiField>,

              <TextArea name="description" label="项目描述" placeholder="请输入项目描述" block />
            ]}
            column={1}
            itemRender={(children, props) => {
              return <Col span={24}>{children}</Col>;
            }}>
            {children => {
              return <Row gutter={[24, 0]}>{children}</Row>;
            }}
          </FormInfo>

          <Divider />

          <Flex justify="end" gap={8}>
            <Button onClick={() => message.info('已取消')}>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Card>
  );
};

render(<BaseExample />);

```

- TableList 表格表单
- 展示 `TableList` 组件的完整功能，包括表格布局、动态行列、数量限制等，以订单明细管理为例。
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd),dayjs(dayjs)

```jsx
const { TableList } = _ReactFormPlus;
const { default: Form, Input, InputNumber, Select, DatePicker } = ReactForm;
const { Row, Col, Button, Card, Empty, Flex, message, Divider, Space, Switch } = antd;

const { useState } = React;

// 模拟真实的业务场景：订单明细管理
const BaseExample = () => {
  const [formData, setFormData] = useState({
    orderItems: [
      { productName: '笔记本电脑', category: 'electronics', quantity: 2, unitPrice: 5999, orderDate: dayjs('2024-01-15') },
      { productName: '无线鼠标', category: 'accessories', quantity: 5, unitPrice: 99, orderDate: dayjs('2024-01-16') }
    ]
  });

  const [config, setConfig] = useState({
    maxLength: 10,
    minLength: 1,
    reverseOrder: false,
    disabled: false
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async data => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('提交的订单数据:', data);
    message.success('订单保存成功');
    setLoading(false);
  };

  const categoryOptions = [
    { label: '电子产品', value: 'electronics' },
    { label: '配件', value: 'accessories' },
    { label: '办公用品', value: 'office' },
    { label: '软件服务', value: 'software' }
  ];

  return (
    <Card title="订单明细管理">
      <Flex vertical gap={16}>
        {/* 配置面板 */}
        <Card size="small" title="配置选项">
          <Flex gap={24} wrap>
            <Space>
              <span>禁用状态:</span>
              <Switch checked={config.disabled} onChange={checked => setConfig({ ...config, disabled: checked })} />
            </Space>
            <Space>
              <span>反向排列:</span>
              <Switch checked={config.reverseOrder} onChange={checked => setConfig({ ...config, reverseOrder: checked })} />
            </Space>
            <Space>
              <span>最少行数:</span>
              <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{config.minLength}</span>
            </Space>
            <Space>
              <span>最多行数:</span>
              <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{config.maxLength}</span>
            </Space>
          </Flex>
        </Card>

        <Form data={formData} onSubmit={handleSubmit} debug>
          <TableList
            name="orderItems"
            title="订单明细"
            className="table-list"
            defaultLength={1}
            minLength={config.minLength}
            maxLength={config.maxLength}
            reverseOrder={config.reverseOrder}
            empty={<Empty description="暂无订单明细，请添加" />}
            beforeAdd={(name, context, params) => {
              console.log('添加订单项前回调:', { name, context, params });
              message.info('准备添加新的订单项');
              return true;
            }}
            afterDelete={(id, index, onRemove, length) => {
              console.log('删除订单项后回调:', { id, index, length });
              message.success('已删除该订单项');
            }}
            list={[
              <Input name="productName" label="商品名称" rule="REQ" placeholder="商品名称" />,
              <Select name="category" label="商品类别" rule="REQ" options={categoryOptions} placeholder="类别" />,
              <InputNumber name="quantity" label="数量" rule="REQ" min={1} placeholder="数量" />,
              <InputNumber name="unitPrice" label="单价" rule="REQ" min={0} placeholder="单价" />,
              <DatePicker name="orderDate" label="订购日期" rule="REQ" placeholder="日期" />
            ]}
            headerRender={(children, { width }) => {
              return (
                <Row
                  className="table-list-header"
                  wrap={false}
                  style={{
                    '--col-width': width,
                    backgroundColor: '#fafafa',
                    borderBottom: '1px solid #f0f0f0',
                    marginBottom: 8
                  }}>
                  {children}
                  <Col className="options" style={{ width: 80, textAlign: 'center', padding: '8px 0' }}>
                    操作
                  </Col>
                </Row>
              );
            }}
            headerItemRender={(children, { id, isReq }) => {
              return (
                <Col
                  className={isReq ? 'is-req' : ''}
                  key={id}
                  style={{
                    width: 'var(--col-width)',
                    padding: '8px 12px',
                    fontWeight: 500
                  }}>
                  {children}
                </Col>
              );
            }}
            itemRender={children => {
              return (
                <Col flex={1} style={{ padding: '8px 12px' }}>
                  {children}
                </Col>
              );
            }}
            listRender={(children, { id, width, onRemove, allowRemove, className }) => {
              return (
                <Row
                  className={className}
                  key={id}
                  wrap={false}
                  style={{
                    '--col-width': width,
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                  {children}
                  <Col className="options" style={{ width: 80, textAlign: 'center', padding: '8px 0' }}>
                    <Button type="link" onClick={onRemove} danger disabled={!allowRemove || config.disabled} size="small">
                      删除
                    </Button>
                  </Col>
                </Row>
              );
            }}>
            {(children, { className, title, allowAdd, onAdd, dataLength }) => {
              return (
                <Card
                  className={className}
                  title={title}
                  extra={
                    <Space>
                      <span style={{ color: '#999', fontSize: 12 }}>
                        当前 {dataLength} 项{config.maxLength && &#96; / 最多 ${config.maxLength} 项&#96;}
                      </span>
                      {allowAdd && !config.disabled && (
                        <Button type="link" onClick={onAdd}>
                          添加订单项
                        </Button>
                      )}
                      {!allowAdd && <span style={{ color: '#ff4d4f', fontSize: 12 }}>已达到最大数量</span>}
                    </Space>
                  }>
                  <div style={{ overflowX: 'auto' }}>{children}</div>
                </Card>
              );
            }}
          </TableList>

          <Divider />

          <Flex justify="end" gap={8}>
            <Button onClick={() => message.info('已取消')}>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交订单
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Card>
  );
};

render(<BaseExample />);

```

- 综合示例 - 员工入职登记
- 综合展示所有组件的组合使用，包括分步骤表单、多种组件配合、完整业务流程。
- _ReactFormPlus(@kne/current-lib_react-form-plus),ReactForm(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd)

```jsx
const { default: FormInfo, FieldList, MultiField, SubList, TableList } = _ReactFormPlus;
const { default: Form, Input, Select, TextArea, DatePicker, InputNumber } = ReactForm;
const { Row, Col, Button, Card, Empty, Flex, message, Divider, Space, Steps, Result, Spin } = antd;

const { useState } = React;

// 真实业务场景：员工入职登记表
const AdvancedExample = () => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitData, setSubmitData] = useState(null);

  // 初始数据 - 模拟从后端获取
  const [formData, setFormData] = useState({
    // 基本信息
    name: '',
    gender: 'male',
    birthday: '',
    idCard: '',
    phone: '',
    email: '',
    address: '',
    
    // 教育背景
    educationList: [
      {
        schoolName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: ''
      }
    ],
    
    // 工作经历
    workExperienceList: [],
    
    // 家庭成员
    familyMembers: [],
    
    // 技能证书
    skills: [''],
    
    // 紧急联系人
    emergencyContacts: [
      { name: '', relationship: '', phone: '' }
    ]
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    // 模拟异步提交
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('提交的员工入职数据:', data);
    setSubmitData(data);
    setLoading(false);
    message.success('提交成功！');
  };

  const degreeOptions = [
    { label: '博士', value: 'doctor' },
    { label: '硕士', value: 'master' },
    { label: '本科', value: 'bachelor' },
    { label: '专科', value: 'college' }
  ];

  const relationshipOptions = [
    { label: '父亲', value: 'father' },
    { label: '母亲', value: 'mother' },
    { label: '配偶', value: 'spouse' },
    { label: '兄弟', value: 'brother' },
    { label: '姐妹', value: 'sister' },
    { label: '其他', value: 'other' }
  ];

  const steps = [
    { title: '基本信息', description: '个人基本资料' },
    { title: '教育背景', description: '学历信息' },
    { title: '工作经历', description: '工作履历' },
    { title: '其他信息', description: '家庭及技能' }
  ];

  // 成功页面
  if (submitData) {
    return (
      <Card>
        <Result
          status="success"
          title="入职登记提交成功"
          subTitle="您的入职信息已成功提交，请等待人事部门审核"
          extra={[
            <Button type="primary" key="console" onClick={() => {
              setSubmitData(null);
              setCurrent(0);
              setFormData({
                name: '',
                gender: 'male',
                birthday: '',
                idCard: '',
                phone: '',
                email: '',
                address: '',
                educationList: [{ schoolName: '', degree: '', major: '', startDate: '', endDate: '' }],
                workExperienceList: [],
                familyMembers: [],
                skills: [''],
                emergencyContacts: [{ name: '', relationship: '', phone: '' }]
              });
            }}>
              重新填写
            </Button>,
            <Button key="buy" onClick={() => console.log('查看详情', submitData)}>
              查看详情
            </Button>
          ]}
        />
      </Card>
    );
  }

  return (
    <Spin spinning={loading} tip="提交中，请稍候...">
      <Card title="员工入职登记表">
        <Flex vertical gap={24}>
          <Steps current={current} items={steps} />

          <Form data={formData} onSubmit={handleSubmit} debug>
            {/* 步骤1: 基本信息 */}
            {current === 0 && (
              <Card size="small" title="基本信息">
                <FormInfo
                  list={[
                    <Input name="name" label="姓名" rule="REQ" placeholder="请输入姓名" />,
                    <Select
                      name="gender"
                      label="性别"
                      rule="REQ"
                      options={[
                        { label: '男', value: 'male' },
                        { label: '女', value: 'female' }
                      ]}
                    />,
                    <DatePicker name="birthday" label="出生日期" rule="REQ" placeholder="请选择日期" />,
                    <Input name="idCard" label="身份证号" rule="REQ" placeholder="请输入身份证号" />,
                    <Input name="phone" label="联系电话" rule="REQ" placeholder="请输入手机号" />,
                    <Input name="email" label="电子邮箱" rule="EMAIL" placeholder="请输入邮箱" />,
                    <TextArea
                      name="address"
                      label="家庭住址"
                      placeholder="请输入详细地址"
                      block
                    />
                  ]}
                  column={2}
                  itemRender={(children, props) => <Col span={props.span}>{children}</Col>}
                >
                  {(children) => <Row gutter={[24, 0]}>{children}</Row>}
                </FormInfo>
              </Card>
            )}

            {/* 步骤2: 教育背景 */}
            {current === 1 && (
              <SubList
                name="educationList"
                title="教育背景"
                itemTitle={({ index }) => &#96;教育经历 ${index + 1}&#96;}
                column={2}
                defaultLength={1}
                minLength={1}
                maxLength={5}
                empty={<Empty description="暂无教育经历" />}
                list={[
                  <Input name="schoolName" label="学校名称" rule="REQ" placeholder="请输入学校名称" />,
                  <Select name="degree" label="学历" rule="REQ" options={degreeOptions} placeholder="请选择学历" />,
                  <Input name="major" label="专业" rule="REQ" placeholder="请输入专业" />,
                  <DatePicker name="startDate" label="开始时间" rule="REQ" picker="month" />,
                  <DatePicker name="endDate" label="结束时间" rule="REQ" picker="month" />,
                  <TextArea name="description" label="描述" placeholder="请输入相关描述" block />
                ]}
                listRender={({ list, id, title, allowRemove, onRemove, ...props }) => (
                  <FormInfo list={list} itemRender={(children, props) => <Col span={props.span}>{children}</Col>} {...props}>
                    {(children, { id, title, allowRemove, onRemove }) => (
                      <Card
                        key={id}
                        size="small"
                        title={title}
                        extra={allowRemove && <Button type="link" danger onClick={onRemove}>删除</Button>}
                        style={{ marginBottom: 16 }}
                      >
                        <Row gutter={[24, 0]}>{children}</Row>
                      </Card>
                    )}
                  </FormInfo>
                )}
              >
                {(children, { title, allowAdd, onAdd, dataLength }) => (
                  <Card
                    title={title}
                    extra={
                      <Space>
                        <span style={{ color: '#999' }}>当前 {dataLength} 条</span>
                        {allowAdd && <Button type="link" onClick={onAdd}>添加教育经历</Button>}
                      </Space>
                    }
                  >
                    <Flex vertical gap={0}>{children}</Flex>
                  </Card>
                )}
              </SubList>
            )}

            {/* 步骤3: 工作经历 */}
            {current === 2 && (
              <TableList
                name="workExperienceList"
                title="工作经历"
                defaultLength={0}
                minLength={0}
                maxLength={10}
                empty={<Empty description="暂无工作经历，应届生可直接进入下一步" />}
                list={[
                  <Input name="company" label="公司名称" rule="REQ" placeholder="公司名称" />,
                  <Input name="position" label="职位" rule="REQ" placeholder="职位" />,
                  <DatePicker name="startDate" label="开始时间" rule="REQ" picker="month" placeholder="开始" />,
                  <DatePicker name="endDate" label="结束时间" picker="month" placeholder="结束" />,
                  <Input name="salary" label="薪资(元)" placeholder="薪资" />
                ]}
                headerRender={(children, { width }) => (
                  <Row wrap={false} style={{ backgroundColor: '#fafafa', marginBottom: 8 }}>
                    {children}
                    <Col style={{ width: 80, textAlign: 'center', padding: '8px 0' }}>操作</Col>
                  </Row>
                )}
                headerItemRender={(children, { id, isReq }) => (
                  <Col key={id} style={{ width: '20%', padding: '8px 12px', fontWeight: 500, color: isReq ? '#ff4d4f' : '#333' }}>
                    {children}
                    {isReq && <span style={{ marginLeft: 4 }}>*</span>}
                  </Col>
                )}
                itemRender={(children) => <Col flex={1} style={{ padding: '8px 12px' }}>{children}</Col>}
                listRender={(children, { id, onRemove, allowRemove }) => (
                  <Row key={id} wrap={false} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    {children}
                    <Col style={{ width: 80, textAlign: 'center', padding: '8px 0' }}>
                      <Button type="link" onClick={onRemove} danger disabled={!allowRemove} size="small">
                        删除
                      </Button>
                    </Col>
                  </Row>
                )}
              >
                {(children, { title, allowAdd, onAdd, dataLength }) => (
                  <Card
                    title={title}
                    extra={
                      <Space>
                        <span style={{ color: '#999' }}>当前 {dataLength} 条</span>
                        {allowAdd && <Button type="link" onClick={onAdd}>添加工作经历</Button>}
                      </Space>
                    }
                  >
                    <div style={{ overflowX: 'auto' }}>{children}</div>
                  </Card>
                )}
              </TableList>
            )}

            {/* 步骤4: 其他信息 */}
            {current === 3 && (
              <Flex vertical gap={16}>
                {/* 家庭成员 */}
                <SubList
                  name="familyMembers"
                  title="家庭成员"
                  itemTitle={({ index }) => &#96;家庭成员 ${index + 1}&#96;}
                  column={2}
                  defaultLength={0}
                  minLength={0}
                  maxLength={5}
                  empty={<Empty description="暂无家庭成员信息" />}
                  list={[
                    <Input name="name" label="姓名" rule="REQ" placeholder="姓名" />,
                    <Select name="relationship" label="关系" rule="REQ" options={relationshipOptions} placeholder="关系" />,
                    <Input name="phone" label="联系电话" placeholder="联系电话" />,
                    <Input name="company" label="工作单位" placeholder="工作单位" />
                  ]}
                  listRender={({ list, id, title, allowRemove, onRemove, ...props }) => (
                    <FormInfo list={list} itemRender={(children, props) => <Col span={props.span}>{children}</Col>} {...props}>
                      {(children, { id, title, allowRemove, onRemove }) => (
                        <Row key={id} gutter={[24, 0]} style={{ marginBottom: 8, padding: 12, backgroundColor: '#fafafa', borderRadius: 4 }}>
                          <Col flex={1}>{children}</Col>
                          <Col>
                            {allowRemove && <Button type="link" danger onClick={onRemove}>删除</Button>}
                          </Col>
                        </Row>
                      )}
                    </FormInfo>
                  )}
                >
                  {(children, { title, allowAdd, onAdd, dataLength }) => (
                    <Card
                      size="small"
                      title={title}
                      extra={
                        <Space>
                          <span style={{ color: '#999' }}>{dataLength} 条</span>
                          {allowAdd && <Button type="link" onClick={onAdd}>添加</Button>}
                        </Space>
                      }
                    >
                      {children}
                    </Card>
                  )}
                </SubList>

                {/* 技能证书 */}
                <Card size="small" title="技能证书">
                  <MultiField
                    name="skills"
                    label="技能/证书"
                    field={Input}
                    placeholder="请输入技能或证书名称"
                    defaultLength={1}
                    minLength={1}
                    maxLength={10}
                    itemRender={(children, { id, allowRemove, onRemove }) => (
                      <Row key={id} gutter={8} style={{ marginBottom: 8 }}>
                        <Col flex={1}>{children}</Col>
                        <Col>
                          <Button type="link" danger disabled={!allowRemove} onClick={onRemove}>
                            删除
                          </Button>
                        </Col>
                      </Row>
                    )}
                  >
                    {(children, { allowAdd, onAdd }) => (
                      <div>
                        {children}
                        {allowAdd && (
                          <Button type="dashed" onClick={onAdd}>
                            添加技能/证书
                          </Button>
                        )}
                      </div>
                    )}
                  </MultiField>
                </Card>

                {/* 紧急联系人 */}
                <SubList
                  name="emergencyContacts"
                  title="紧急联系人"
                  itemTitle={({ index }) => &#96;紧急联系人 ${index + 1}&#96;}
                  column={3}
                  defaultLength={1}
                  minLength={1}
                  maxLength={3}
                  list={[
                    <Input name="name" label="姓名" rule="REQ" placeholder="姓名" />,
                    <Select name="relationship" label="关系" rule="REQ" options={relationshipOptions} placeholder="关系" />,
                    <Input name="phone" label="联系电话" rule="REQ" placeholder="电话" />
                  ]}
                  listRender={({ list, id, title, allowRemove, onRemove, ...props }) => (
                    <FormInfo list={list} itemRender={(children, props) => <Col span={props.span}>{children}</Col>} {...props}>
                      {(children, { id, title, allowRemove, onRemove }) => (
                        <Row key={id} gutter={[24, 0]} style={{ marginBottom: 8 }}>
                          <Col flex={1}>{children}</Col>
                          <Col>
                            {allowRemove && <Button type="link" danger onClick={onRemove}>删除</Button>}
                          </Col>
                        </Row>
                      )}
                    </FormInfo>
                  )}
                >
                  {(children, { title, allowAdd, onAdd, dataLength }) => (
                    <Card
                      size="small"
                      title={title}
                      extra={
                        <Space>
                          <span style={{ color: '#999' }}>{dataLength} 条</span>
                          {allowAdd && <Button type="link" onClick={onAdd}>添加</Button>}
                        </Space>
                      }
                    >
                      {children}
                    </Card>
                  )}
                </SubList>
              </Flex>
            )}

            <Divider />

            <Flex justify="space-between">
              <Button disabled={current === 0} onClick={() => setCurrent(current - 1)}>
                上一步
              </Button>
              <Space>
                {current < steps.length - 1 ? (
                  <Button type="primary" onClick={() => setCurrent(current + 1)}>
                    下一步
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit" loading={loading}>
                    提交入职登记
                  </Button>
                )}
              </Space>
            </Flex>
          </Form>
        </Flex>
      </Card>
    </Spin>
  );
};

render(<AdvancedExample />);

```

### API

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
