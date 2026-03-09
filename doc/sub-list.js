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
            itemTitle={({ index, id }) => `教育经历 ${index + 1}`}
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
                        {config.maxLength && ` / 最多 ${config.maxLength} 条`}
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
