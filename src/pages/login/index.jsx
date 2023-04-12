import './index.less';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { login } from '../../api/login';
import { useNavigate } from 'react-router-dom';

const loginTitle = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbQAAAAsCAYAAAANdk3cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NThmYzIzNC03NjU2LTc5NDctYTBhZi1jMjRlYjU4MzRkMzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjBGMDlDMTNCN0MxMTFFODg5NDg4MEYzQzlCRTA5RjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjBGMDlDMTJCN0MxMTFFODg5NDg4MEYzQzlCRTA5RjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmJhODQ2NGMxLWNlMzgtZTU0ZS1hNGY0LTM4OTAzYzJmMmZkNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NThmYzIzNC03NjU2LTc5NDctYTBhZi1jMjRlYjU4MzRkMzUiLz4gPC9y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'

let isLoading = false

function useLogin() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onFinishFailed = () => {

    }

    const onFinish = (values) => {
        console.log('values', values)
    }

    const handleSubmitForm = () => {
        setIsLoading(true);
        console.log('触发', account, password)
        login({
            mobile: account,
            password,
        }).then(res => {            
            if (res?.success) {
                setIsLoading(false);
                localStorage.setItem('token', res.data)
                navigate('/home');
            }

        })
    }

    const handleAccount = (e) => {
        setAccount(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="login-wrap">
            <div className="login_box">
                <h3>
                    <img src={loginTitle} />
                </h3>
                <section style={{ width: '100%' }}>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        size="large"
                    >
                        <Form.Item
                            name="username"
                            style={{ width: '100%' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} value={account} onChange={handleAccount} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} value={password} onChange={handlePassword} />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button loading={isLoading} type="primary" style={{ width: '100%' }} onClick={handleSubmitForm} size="large">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        </div>
    );
}

export default useLogin;
