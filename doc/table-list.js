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
                        当前 {dataLength} 项{config.maxLength && ` / 最多 ${config.maxLength} 项`}
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
