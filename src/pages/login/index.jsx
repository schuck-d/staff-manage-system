import './index.less';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { login } from '../../api/login';
import { useNavigate } from 'react-router-dom';

function useLogin() {

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const onFinishFailed = () => {

    }

    const onFinish = (values) => {
        console.log('values', values)
    }

    const handleSubmitForm = () => {
        console.log('触发', account, password)
        login({
            mobile: account,
            password,
        }).then(res => {            
            if (res.success) {
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
            <section>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input value={account} onChange={handleAccount} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password value={password} onChange={handlePassword} />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" onClick={handleSubmitForm}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    );
}

export default useLogin;
