import { Card, Col, Row, Tree } from 'antd';
import { getDepartmentList } from '../../api/department.js';
import { useEffect } from 'react';
import { useState } from 'react';
import './index.less';

const { TreeNode } = Tree;

const Departments = () => {
    let departmentData;
    const [treeData, setTreeData] = useState([]);

    const handleDepts = (data, rootVal) => {
        const arr = [];

        data.forEach((item) => {
            if (item.pid === rootVal) {
                const children = handleDepts(data, item.id);

                if (children.length) {
                    item.children = children;
                }

                item.key = item.id;
                item.title = item.name;

                arr.push(item);
            }
        });

        console.log('处理过后的', arr);

        return arr;
    };

    const handleDepartmentList = () => {
        getDepartmentList().then((res) => {
            if (res.success) {
                const result = handleDepts(res.data.depts, '');
                setTreeData(result);
                console.log('树形', result);
            }
        });
    };

    useEffect(() => {
        console.log('调用次数');
        handleDepartmentList();
    }, []);

    return (
        <Card
            style={{
                width: '100%',
                height: '100%',
                margin: '10px',
            }}
        >
            <section>组织架构</section>
            <Tree
                treeData={treeData}
                // height={300}
                // titleRender={(item) => (
                //     <Row>
                //         <Col span={8}>{item.name}</Col>
                //         <Col span={8}>{item.manager}</Col>
                //     </Row>
                // )}
                titleRender={(item) => (
                    <>
                        <div>{item.name}</div>
                        <div style={{ marginLeft: '800px' }}>
                            {item.manager}
                        </div>
                    </>
                )}
            >
                {/* {treeData.map((item) => (
                    // <Row>
                    //     <Col span={8}>{item.name}</Col>
                    //     <Col span={8}>{item.manager}</Col>
                    // </Row>
                    <TreeNode
                        title={
                            <>
                                <div>{item.name}</div>
                                <div>{item.manager}</div>
                            </>
                            // <Row>
                            //     <Col span={8}>{item.name}</Col>
                            //     <Col span={8}>{item.manager}</Col>
                            // </Row>
                        }
                        key={item.id}
                    />
                ))} */}
            </Tree>
        </Card>
    );
};

export default Departments;
