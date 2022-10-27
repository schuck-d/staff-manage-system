import { Button, Card, Table, Modal, Row, Avatar, Col, Divider, Form, Input, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { getSysUserList } from '../../api/employees';
const { TextArea } = Input;

const Employees = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: '工号',
            dataIndex: 'workNumber',
            key: 'workNumber',
        },
        {
            title: '聘用形式',
            dataIndex: 'formOfEmployment',
            key: 'formOfEmployment',
        },
        {
            title: '部门',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: '入职时间',
            dataIndex: 'timeOfEntry',
            key: 'timeOfEntry',
        },
        {
            title: '是否在职',
            dataIndex: 'inServiceStatus',
            key: 'inServiceStatus',
        },
        {
            title: '状态',
            dataIndex: 'enableState',
            key: 'enableState',
        },
        {
            align: 'center',
            title: '操作',
            key: 'operate',
            render: () => (
                <>
                    <Button type="link">查看</Button>
                    <Button type="link" onClick={showModal}>
                        转正
                    </Button>
                    <Button type="link">调岗</Button>
                    <Button type="link">离职</Button>
                    <Button type="link">角色</Button>
                    <Button type="link">删除</Button>
                </>
            ),
        },
    ];

    const handleChangePage = (currentPage, pageSize) => {
        console.log('page', currentPage, pageSize);
        setPage(currentPage);
        setSize(pageSize);
        console.log('当前页', page);
    };

    const handleSysUserList = () => {
        console.log('current-page', page);
        getSysUserList({
            page,
            size,
        }).then((res) => {
            if (res.success) {
                console.log('list', res);
                setDataSource(
                    res.data.rows.map((item) => ({ key: item.id, ...item }))
                );
                setTotal(res.data.total);
            }
        });
    };

    useEffect(() => {
        console.log('useEffect触发了');
        handleSysUserList();
    }, [page]);

    return (
        <Card style={{ margin: 10 }}>
            <Table
                dataSource={dataSource}
                pagination={{
                    current: page,
                    pageSize: size,
                    total,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    onChange: handleChangePage,
                    showTotal: (total) => `共${total}条`,
                }}
                columns={columns}
            />

            <Modal
                title="转正"
                width={700}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Row>
                    <Col>
                    <Avatar size={64} icon={<UserOutlined/>} />
                    </Col>
                    <Col>
                    <h3>管理员</h3>
                    <div>
                        <span>手机</span>
                        <span>部门</span>
                    </div>
                    <div>入职时间</div>
                    </Col>
                </Row>
                <Divider/>
                <Form>
                    <Form.Item label='转正时间'>
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item label='转正评价'>
                        <TextArea/>
                    </Form.Item>
                </Form>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </Card>
    );
};

export default Employees;
