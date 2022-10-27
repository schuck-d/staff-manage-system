import styles from './index.module.less';
import { useNavigate } from 'react-router-dom'
import {
    SearchOutlined,
    QuestionCircleOutlined,
    FullscreenOutlined,
    TranslationOutlined,
    UserOutlined,
    DownOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { Space, Avatar, Menu, Dropdown, Modal } from 'antd';
const { confirm } = Modal;

const NavBar = () => {
    const navigateTo = useNavigate()

    const showConfirm = () => {
        confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '你确认要退出吗？',
            onOk() {
                console.log('OK');
                navigateTo('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleSelect = ({ key }) => {
        console.log('item', key);
        if (key === '2') {
            showConfirm();
        }
    };

    const menu = (
        <Menu
            selectable
            onSelect={handleSelect}
            items={[
                {
                    key: '1',
                    label: '首页',
                },
                {
                    key: '2',
                    label: '退出登录',
                },
            ]}
        />
    );

    return (
        <section className={styles['nav-bar-wrap']}>
            <div className={styles.left}>
                <span className={styles.title}>人力资源管理系统</span>
                <span className={styles.version}>体验版</span>
            </div>
            <div className={styles.right}>
                <Space>
                    <SearchOutlined style={{ color: '#fff' }} />
                    <QuestionCircleOutlined style={{ color: '#fff' }} />
                    <FullscreenOutlined style={{ color: '#fff' }} />
                    <TranslationOutlined style={{ color: '#fff' }} />
                    <section>
                        <Avatar icon={<UserOutlined />} />
                        {/* <span>管理员</span> */}
                        <Dropdown overlay={menu}>
                            <Space>
                                <span>管理员</span>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </section>
                </Space>
            </div>
        </section>
    );
};

export default NavBar;
