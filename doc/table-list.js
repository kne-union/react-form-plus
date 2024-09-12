const {TableList} = _ReactFormPlus;
const {default: Form, Input, TextArea} = ReactForm;
const {Row, Col, Button, Card, Empty, Flex} = antd;

const BaseExample = () => {
    return <Form>
        <TableList title="表格表单" className="table-list" empty={<Empty/>} headerRender={(children, {width}) => {
            return <Row className="table-list-header" wrap={false} style={{
                "--col-width": width,
            }}>
                {children}
                <Col className="options"></Col>
            </Row>
        }} headerItemRender={(children, {id, isReq}) => {
            return <Col className={isReq ? "is-req" : ""} key={id}>{children}</Col>
        }} itemRender={(children) => {
            return <Col flex={1}>{children}</Col>;
        }} listRender={(children, {id, width, onRemove, allowRemove}) => {
            return <Row key={id} wrap={false} style={{
                "--col-width": width,
            }}>
                {children}
                <Col className="options"><Button type="link" onClick={onRemove} danger
                                                 disabled={!allowRemove}>删除</Button></Col>
            </Row>
        }} list={[<Input name="name" label="名称" rule="REQ"/>, <Input name="field1" label="字段1" rule="REQ"/>,
            <Input name="field2" label="字段2" />]}>{(children, {className, title, allowAdd, onAdd}) => {
            return <Card className={className} title={title} extra={allowAdd && <Button type="link" onClick={onAdd}>添加</Button>}>
                {children}
            </Card>
        }}</TableList>
    </Form>;
};

render(<BaseExample/>);
