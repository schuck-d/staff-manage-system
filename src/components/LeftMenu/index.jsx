import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const LeftMenu = () => {
    const navigate = useNavigate()

    const items = [
        { label: '首页', key: '1' }, // 菜单项务必填写 key
        { label: '组织架构', key: '/departments' },
        { label: '员工',key: '/employees' },
        { label: '公司设置', key: '4' },
        { label: '权限设置', key: '5' },
        { label: '社保', key: '6' },
        { label: '考勤', key: '7' },
        { label: '工资', key: '8' },
        { label: '审批', key: '9' },
    ];

    return <Menu items={items} mode="inline" onClick={item => navigate(item.key)} />;
};

export default LeftMenu;
