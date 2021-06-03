import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Drawer, Button, Modal, Form, Input, Select, Upload, message, Image } from 'antd';
import { Link } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';
import { UserOutlined, HistoryOutlined, MailOutlined, LoginOutlined, ShoppingCartOutlined, WomanOutlined, UploadOutlined } from '@ant-design/icons';
import *as actionTypes from 'Actions/index';
import './inforUser.css';
import $ from 'jquery';
const token = localStorage.getItem('token');
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        lg: {
            span: 24,
        },
        xl: {
            span: 24,
        },
    },
    wrapperCol: {
        xs: {
            span: 0,
        },
        sm: {
            span: 24,
        },
    },
};
export default function InforUser(props) {
    const dispatch = useDispatch();
    const updataInformationUserRequestAPI = data => dispatch(actionTypes.updataInformationUserRequestAPI(data));
    const uploadImageUserRequestAPI = data => dispatch(actionTypes.uploadImageUserRequestAPI(data));

    const { data } = props;
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [visibleInfont, setVisibleInfor] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nameUser, setNameUser] = useState(null);
    const [sexUser, setSexUser] = useState(null);
    const [fileList, updateFileList] = useState([]);

    //function
    
    useEffect(() => {
        if (data[0]) {
            setSexUser(data[0].sex);
            setNameUser(data[0].user);
            setLoading(false);
            setVisibleInfor(false);
            form.resetFields(['name']);
            form.resetFields(['sex']);
        }
    }, [data[0], sexUser, nameUser]);

    useEffect(() => {
        visible ? $('body').addClass('active') : $('body').removeClass('active');
    }, [visible]);
    const onFinish = value => {
        const data = {
            token: token,
            user: {
                name: value.name,
                sex: value.sex
            }
        };
        if (value) {
            updataInformationUserRequestAPI(data);
            setLoading(true);
        }
    };

  
    const LoginOutlinedUser = () => {
        setVisible(false);
        localStorage.removeItem('token');
        window.location.reload();
    }
  
 

    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        if (isLt2M && isJpgOrPng) {
            const formData = new FormData();
            formData.append("avatar", file);
            const data = {
                token: token,
                formData: formData,
            };
          
             uploadImageUserRequestAPI(data);
            setLoading(true);
        }
        return isJpgOrPng && isLt2M;
    };


    // function


    return (
        < >
            {data.length > 0 && (
                <div className="frofile">
                    <div className="avartar-user">
                        <img src={data[0].avatar} alt={data[0].name} onClick={()=>setVisible(true)} />
                    </div>
                    <div className="group-information">
                        <Drawer
                            title="Thông tin"
                            width={400}
                            onClose={()=>  setVisible(false)}
                            visible={visible}
                            className="container-information"
                        >
                            <div className="information">
                                <div className="group-avatar">
                                    <Image src={data[0].avatar}>

                                    </Image>
                                    <div className="group-upload-image">
                                        <ImgCrop
                                            modalOk='Cập Nhật'
                                            modalCancel='Hủy'
                                            rotate
                                            modalTitle='Cập Nhật Avatar'
                                        >
                                            <Upload
                                                beforeUpload={beforeUpload}
                                                fileList={fileList}
                                                name="avatar"
                                                accept=".jpg, .jpeg, .png"
                                                listType="listTyp"

                                            >
                                                <Button
                                                    loading={loading}
                                                    icon={<UploadOutlined />}
                                                    type="upload"
                                                >Upload
                                                     </Button>

                                            </Upload>
                                        </ImgCrop>
                                    </div>
                                </div>

                                <div className="group-name hover-group-information">
                                    <div className="icon-name">
                                        <UserOutlined className="icon-user-information" />

                                    </div>
                                    <div className="name-information">
                                        <p className="inforUser" style={{ 'fontWeight': '600' }}>{data[0].name}</p>
                                    </div>
                                </div>
                                <div className="group-email hover-group-information">
                                    <div className="icon-email">
                                        <MailOutlined className="icon-user-information" />
                                    </div>
                                    <div className="email-information">
                                        <p className="inforUser">{data[0].email}</p>
                                    </div>
                                </div>
                                <div className="group-sex hover-group-information">
                                    <div className="icon-sex">
                                        <WomanOutlined className="icon-user-information" />
                                    </div>
                                    <div className="sex-information">
                                        <p className="inforUser">{data[0].sex}</p>
                                    </div>
                                </div>
                                <div className="group-buy-cart">
                                    <div className="icon-bay-cart">
                                        <ShoppingCartOutlined className="icon-user-information" />
                                    </div>
                                    <div className="buy-cart-information">
                                        <Link
                                            onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 500); setVisible(false) }}
                                            className="inforUser"
                                            to="/history-cart"
                                        >Lịch sử mua hàng
                                          </Link>
                                    </div>
                                </div>
                                <div className="group-comments">
                                    <div className="icon-bay-cart">
                                        <HistoryOutlined className="icon-user-information" />
                                    </div>
                                    <div className="comments-information">
                                        <Link
                                            onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 500); setVisible(false) }}
                                            className="inforUser"
                                            to="/history-comment"
                                        >Nhật ký hoạt động
                                      </Link>
                                    </div>
                                </div>
                                <div className="group-loginout hover-group-information">
                                    <div className="icon-information">
                                        <LoginOutlined className="icon-user-information" style={{ 'color': '#ec1839' }} />
                                    </div>
                                    <div className="loginout-information hover-group-information">
                                        <button className="inforUser" style={{ 'color': '#ec1839' }} onClick={LoginOutlinedUser}>
                                            Đăng xuất
                                      </button>
                                    </div>
                                </div>
                                <div className="change-information">
                                    <Button
                                        block
                                        type="primary"
                                        onClick={() => { setVisibleInfor(true) }}
                                    >
                                        Đổi Thông Tin
                                     </Button>

                                </div>
                                <Modal
                                    visible={visibleInfont}
                                    title=" Đổi Thông Tin"
                                    onCancel={() => { setVisibleInfor(false) }}
                                    footer={[
                                        <Form
                                            {...formItemLayout}
                                            form={form}
                                            onFinish={onFinish}
                                        >
                                            <Button
                                                key="back"
                                                onClick={() => { setVisibleInfor(false) }}
                                            >
                                                Hủy
                                         </Button>

                                            <Button
                                                key="submit"
                                                htmlType="submit"
                                                type="primary"
                                                loading={loading}
                                            >
                                                cập Nhật
                                 </Button>
                                        </Form>
                                    ]}
                                >
                                    <Form
                                        {...formItemLayout}
                                        form={form}
                                        onFinish={onFinish}
                                    >
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
                                            <Input />
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
                                    </Form>
                                </Modal>
                            </div>
                        </Drawer>
                    </div>
                </div>
            )}
        </>
    )
}