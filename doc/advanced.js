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
                itemTitle={({ index }) => `教育经历 ${index + 1}`}
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
                  itemTitle={({ index }) => `家庭成员 ${index + 1}`}
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
                  itemTitle={({ index }) => `紧急联系人 ${index + 1}`}
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
