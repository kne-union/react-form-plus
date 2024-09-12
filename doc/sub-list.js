const {default: FormInfo, SubList} = _ReactFormPlus;
const {default: Form, Input, TextArea} = ReactForm;
const {Row, Col, Button, Card, Empty, Flex} = antd;

const BaseExample = () => {
    return <Form>
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
