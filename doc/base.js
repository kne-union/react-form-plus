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
