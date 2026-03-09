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
                          当前已添加 {formData.members?.length || 0} 人{config.maxLength && ` / 最多 ${config.maxLength} 人`}
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
