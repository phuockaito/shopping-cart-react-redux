import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import avatarBoy from 'image/Boy.png';
import avatarGirl from 'image/Girl.png';
import * as actionTypes from 'Actions/index';
import './register.css';
import { Form, Input, Select, Button } from 'antd';
import $ from 'jquery';
const token = localStorage.getItem('token');
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 12,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 12,
        },
    },
};

export default function Register() {
    const history = useHistory();
    document.querySelector('title').innerHTML = 'Đăng Ký';
    if (token) {
        history.push("/");
    }
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    // API
    const registerRegister = user => dispatch(actionTypes.registerRegisterAPI(user));
    //function
    const onFinish = (values) => {
        const data = {
            name: values.name,
            email: values.email.trim(),
            password: values.password,
            avatar: values.sex === 'Nam' ? avatarBoy : avatarGirl,
            sex: values.sex,
        }
        if (values) {
            registerRegister(data);
        }
    };
    return (
        <>
            <div className="group-register">
                <div className="main-register">
                    <div className="container-register">
                        <h3>Đăng ký</h3>
                        <Form
                            {...formItemLayout}
                            form={form}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        max: 50,
                                        message: 'E-mail quá dài!',
                                    }
                                    ,
                                    {
                                        type: 'email',
                                        message: 'Đầu vào không hợp lệ E-mail !',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đúng E-mail !',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input
                                    placeholder="abc@gmail.com"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Mật khẩu"
                                rules={[
                                    {
                                        min: 8,
                                        message: 'Mật khẩu quá ngắn ít nhất 8 ký tự !',
                                    },
                                    {
                                        required: true,
                                        type: 'string',
                                        message: 'Vui lòng nhập mật khẩu của bạn !',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    placeholder="********"
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                label="Xác nhận mật khẩu"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng xác nhận lại mật khẩu!',
                                        type: 'string',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Mật khẩu bạn đã nhập không khớp !');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="********"
                                />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label={
                                    <span>
                                        Tên của bạn&nbsp;
                                </span>
                                }
                                pattern={[/^[a-z0-9]+$/]}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập đầy đủ tên bạn !',
                                        whitespace: true,
                                        type: 'string'
                                    },
                                    {
                                        min: 1,
                                        max: 25,
                                        message: 'Vui lòng nhập đúng tên của bạn !',
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Nguyễn Văn A"
                                />
                            </Form.Item>
                            <Form.Item
                                name="sex"
                                label="Giới tính"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn giới tính của bạn',
                                    },
                                ]}
                            >
                                <Select placeholder="Nam hoặc nữ" >
                                    <Option value="Nam" >Nam</Option>
                                    <Option value="Nữ">Nữ</Option>
                                </Select >
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout} shouldUpdate={true}>
                                {
                                    () => (
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="btn-register"
                                            disabled={
                                                !form.isFieldsTouched(true) ||
                                                form.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                        >
                                            Đăng ký
                                        </Button>
                                    )
                                }
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Link
                                    to="/login"
                                    className="Login-form"
                                    onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 500) }}
                                >
                                    Đăng nhập</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
};