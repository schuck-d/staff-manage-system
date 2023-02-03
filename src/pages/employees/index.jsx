import { Button, Card, Table, Modal, Row, Avatar, Col, Divider, Form, Input, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useState, useCallback } from 'react';
import { getSysUserList, postSubmitFullMember } from '../../api/employees';
const { TextArea } = Input;

const Employees = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullMemberForm, setFullMemberForm] = useState({
        correctionEvaluation: '', // 转正评价
        createTime: '', // 创建时间
        dateOfCorrection: '', // 转正日期
        enclosure: '', // 附件
        estatus: '', // 状态 1是未执行，2是已执行
        userId: '', // 员工ID
        mobile: '',
        userName: '',
        departmentName: '',
        timeOfEntry: '',
    });

    const showModal = (item) => {
        console.log('item', item)
        setFullMemberForm(prev => ({
            ...prev,
            userId: item.id,
            estatus: item.enableState,
            createTime: item.createTime,
            mobile: item.mobile,
            userName: item.userName,
            departmentName: item.departmentName,
            timeOfEntry: item.timeOfEntry
        }))
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const data = {
            ...fullMemberForm,
            mobile: undefined,
            userName: undefined,
            departmentName: undefined,
            timeOfEntry: undefined,
        }
        console.log('form', fullMemberForm)
        postSubmitFullMember('1063705989926227968', data).then(res => {
            console.log('res', res)
        })
        setIsModalOpen(false);
    };

    const handleEvaluation = useCallback((val) => {
        setFullMemberForm(prev => ({
            ...prev,
            correctionEvaluation: val.correctionEvaluation
        }))
    }, [])

    const handleTimeOfEntry = useCallback((val) => {
        setFullMemberForm(prev => ({
            ...prev,
            dateOfCorrection: val.dateOfCorrection
        }))
    }, [])

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
            width: '150px'
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            width: '150px'
        },
        {
            title: '工号',
            dataIndex: 'workNumber',
            key: 'workNumber',
            width: '150px'
        },
        {
            title: '聘用形式',
            dataIndex: 'formOfEmployment',
            key: 'formOfEmployment',
            width: '150px'
        },
        {
            title: '部门',
            dataIndex: 'departmentName',
            key: 'departmentName',
            width: '150px'
        },
        {
            title: '入职时间',
            dataIndex: 'timeOfEntry',
            key: 'timeOfEntry',
            width: '150px'
        },
        {
            title: '是否在职',
            dataIndex: 'inServiceStatus',
            key: 'inServiceStatus',
            // fixed: 'right',
            width: '150px'
        },
        {
            title: '状态',
            dataIndex: 'enableState',
            key: 'enableState',
            // fixed: 'right',
            width: '150px'
        },
        {
            align: 'center',
            title: '操作',
            key: 'operate',
            fixed: 'right',
            width: '320px',
            render: (text, record, index) => (
                <>
                    <Button type="link" size="middle">查看</Button>
                    <Button type="link" size="small" onClick={() => showModal(record)}>
                        转正
                    </Button>
                    <Button type="link" size="small">调岗</Button>
                    <Button type="link" size="small">离职</Button>
                    <Button type="link" size="small">角色</Button>
                    <Button type="link" size="small">删除</Button>
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
                scroll={{ x: '100%' }}
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
                    <h3>{fullMemberForm.userName}</h3>
                    <div>
                        <span>手机: {fullMemberForm.mobile}</span>
                        <span>部门: {fullMemberForm.departmentName}</span>
                    </div>
                    <div>入职时间: {fullMemberForm.timeOfEntry}</div>
                    </Col>
                </Row>
                <Divider/>
                <Form>
                    <Form.Item label='转正时间'>
                        <DatePicker onChange={handleTimeOfEntry} value={fullMemberForm.dateOfCorrection} />
                    </Form.Item>
                    <Form.Item label='转正评价'>
                        <TextArea onChange={handleEvaluation} value={fullMemberForm.correctionEvaluation}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default Employees;
