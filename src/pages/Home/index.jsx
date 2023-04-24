import { Card, Calendar, Button, Row, Col } from 'antd';
import './index.less';
import {Fragment} from "react";

const photoUrl = 'https://th.bing.com/th/id/R.1192f7909decb59b4403efc474a0a65c?rik=oXcnJ3zU3mzuMQ&riu=http%3a%2f%2fn.sinaimg.cn%2fsinacn10109%2f480%2fw1200h1680%2f20190209%2f5eac-hsqyiwu5103663.jpg&ehk=Qa8gTFsxlS9%2bZle%2bo8MJIpgZ0kMMcTv4Hvlv6BGwJLE%3d&risl=&pid=ImgRaw&r=0'

const Home = () => {

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
        <Fragment>
            <Card style={{ margin: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img className="avatar" src={photoUrl} alt="" />
                    <section>
                        <div className="line1">早安，管理员，祝你开心每一天！</div>
                        <div className="line2">管理员 | 理想科技-总裁办</div>
                    </section>
                </div>
            </Card>

            <div style={{ display: 'flex' }}>
                <section style={{ width: '50%' }}>
                    <Card title="工作日历" style={{ marginLeft: '10px' }}>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                    </Card>

                    <Card title="公告" style={{ margin: '10px 0 0 10px' }}>
                        {[1, 2, 3].map(item => (
                            <div style={{ display: 'flex' }} key={item}>
                                <img className="notice_img" src={photoUrl} alt="" />
                                <div>
                                    <p>
                                        <span className="author_name">一哈</span>
                                        发布了最新的文章
                                    </p>
                                    <p className="time">2023-04-24 11:29:25</p>
                                </div>
                            </div>
                        ))}
                    </Card>
                </section>

                <section style={{ width: '50%', margin: '0 10px 0 10px' }}>
                    <Card>
                        <div className="card_title">流程申请</div>
                        <Row gutter={40}>
                            <Col span={3}>
                                <Button size="large">加班离职</Button>
                            </Col>
                            <Col span={3}>
                                <Button size="large">请假调休</Button>
                            </Col>
                            <Col span={3}>
                                <Button size="large">审批列表</Button>
                            </Col>
                            <Col span={3}>
                                <Button size="large">我的信息</Button>
                            </Col>
                        </Row>
                    </Card>

                    <Card style={{ marginTop: '10px' }}>
                        <div className="card_title">快速开始/便捷导航</div>
                        <Row gutter={40}>
                            <Col span={3}>
                                <Button size="large">人事月报</Button>
                            </Col>
                            <Col span={3}>
                                <Button size="large">考勤查询</Button>
                            </Col>
                            <Col span={3}>
                                <Button size="large">考勤统计</Button>
                            </Col>
                            <Col span={3}>
                                <Button size="large">员工审核</Button>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={3}>
                                <Button size="large">组织架构</Button>
                            </Col>
                        </Row>
                    </Card>

                    <Card style={{ marginTop: '10px' }}>
                        <div className="card_title">帮助链接</div>
                        <Row>
                            <Col span={8}>
                                <div className="item">
                                    <div className="item_img1"></div>
                                    <span>入门指南</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="item">
                                    <div className="item_img2"></div>
                                    <span>在线帮助手册</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="item">
                                    <div className="item_img3"></div>
                                    <span>联系技术支持</span>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </section>
            </div>
        </Fragment>
    );
};

export default Home;
