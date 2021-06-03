import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import * as actionTypes from 'Actions/index';
import './login.css';
const token = localStorage.getItem('token');
export default function Login() {
    const [form] = Form.useForm();
    document.querySelector('title').innerHTML = 'Đăng Nhập';
    const dispatch = useDispatch();
    const history = useHistory();
    // check data user is
    if (token) {
        history.push("/");
    }

    // API
    const loginUserRequestAPI = user => dispatch(actionTypes.loginUserRequestAPI(user))
    //function
    const onFinish = (values) => {
        const data = {
            email: values.email,
            password: values.password,
        }
        loginUserRequestAPI(data);
    };
    return (
        <>
         
            < div className="group-login" >
                <div className="main-login">
                    <div className="container-login">
                        <h3>Đăng nhập</h3>
                        <Form
                            form={form}
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'E-mail không hợp lệ !',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đúng E-mail !',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        type: 'string',
                                        message: 'Vui lòng nhập mật khẩu của bạn !',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                                <div className='group-login-register'>
                            <Form.Item 
                            shouldUpdate={true}
                            >
                                {
                                    () => (
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="login-form-button btn-login"
                                            disabled={
                                                !form.isFieldsTouched(true) ||
                                                form.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                        >
                                            Đăng nhập
                                        </Button>
                                    )
                                }
                            </Form.Item>
                         
                            <Link 
                            onClick={() =>{ $("html ,body").animate({ scrollTop: 0 }, 500)}}
                            to="/register" 
                            className="btn-register"
                            >Tạo tài khoản</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </ div>
        </>
    )
};