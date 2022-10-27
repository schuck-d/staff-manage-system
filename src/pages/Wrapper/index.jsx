import { Layout } from 'antd';
import './index.less';
import NavBar from '../../components/NavBar';
import LeftMenu from '../../components/LeftMenu';
import { Outlet } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

function Wrapper() {
    return (
        <>
            <Layout>
                <Sider theme='light'>
                    <LeftMenu />
                </Sider>
                <Layout>
                    <Header>
                        <NavBar />
                    </Header>
                    <Content>
                        <Outlet />
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </>
    );
}

export default Wrapper;
