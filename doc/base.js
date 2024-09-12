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
