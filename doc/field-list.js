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
                    ? `${contextApi.formData.name}的备注`
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
