const { default: FormInfo, MultiField } = _ReactFormPlus;
const { default: Form, Input, TextArea } = ReactForm;
const { Row, Col, Button, Flex, Switch } = antd;

const { useState } = React;

const BaseExample = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Form>
      <Flex vertical gap={10}>
        <Flex gap={8}>
          <span>是否disabled状态</span>
          <Switch checked={disabled} onChange={setDisabled} />
        </Flex>
        <FormInfo
          list={[
            <MultiField
              name="name"
              label="名称"
              rule="REQ"
              field={Input}
              disabled={disabled}
              block
              maxLength={3}
              itemRender={(children, { id, allowRemove, onRemove }) => {
                return (
                  <Row key={id}>
                    <Col flex={1}>{children}</Col>
                    <Col>
                      <Button type="link" disabled={!allowRemove} danger onClick={onRemove}>
                        删除
                      </Button>
                    </Col>
                  </Row>
                );
              }}>
              {(children, { allowAdd, onAdd }) => {
                return (
                  <div style={{ marginBottom: 20 }}>
                    {children}
                    <Flex justify="space-between">
                      <div></div>
                      {allowAdd && (
                        <Button type="dashed" onClick={onAdd}>
                          添加
                        </Button>
                      )}
                    </Flex>
                  </div>
                );
              }}
            </MultiField>,
            <Input name="field1" label="字段1" rule="REQ" />,
            <Input name="field2" label="字段2" rule="REQ" />,
            <TextArea name="description" label="描述" block />
          ]}
          itemRender={(children, props) => {
            return <Col span={props.span}>{children}</Col>;
          }}>
          {children => {
            return <Row gutter={[24, 0]}>{children}</Row>;
          }}
        </FormInfo>
      </Flex>
    </Form>
  );
};

render(<BaseExample />);
