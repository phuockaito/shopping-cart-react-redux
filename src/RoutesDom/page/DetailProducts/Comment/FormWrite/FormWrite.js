import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment, Avatar, Form, Button, Input, notification } from 'antd';
import StarRatings from "react-star-ratings";
import * as actionTypes from 'Actions/index';
import SpinLoading from 'Compoment/Spin/SpinLoading';
import './style.css';
import Notoken from 'image/Notoken.png';
const Token = localStorage.getItem('token');
export default function FormWrite(props) {
    const dispatch = useDispatch();
    const dataUser = useSelector(state => state.User.user);
    const postCommentProducts = data => dispatch(actionTypes.postCommentProductsAPI(data));
    const { _id, data, data_product } = props;
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [start, setStart] = useState(0);
    const [contentCmt, setContentCmt] = useState(0);
    // useEffect
    useEffect(() => {
        form.resetFields(['content']);
        setStart(0);
        setContentCmt(0)
        setSubmitting(false);
    }, [data.length]);

    // futction
    const onFinish = (values) => {
        const product = {
            _id: data_product[0]._id,
            poster: data_product[0].poster[0].url,
            key: data_product[0].key,
            NSX: data_product[0].NSX,
            name: data_product[0].name,
        }
        const data = {
            token: Token,
            data: {
                id_product: _id,
                array_product: product,
                content: values.content.trim(),
                start: start
            }
        };

        if (Token) {
            postCommentProducts(data);
            setSubmitting(true);
        }
        else {
            notification['error']({
                message: 'Vui lòng đăng nhập !',
            });

        }
    };

    const onChangeTextArea = (e) => {
        setContentCmt(e.target.value.length)
        if (e.target.value.trim() === '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }
    const handleChange = (newRating) => {
        setStart(newRating);
    }
    // state
    const showIconImage = (Notoken, dataUser) => {
        let avatar = null;
        if (dataUser.length > 0) {
            avatar = dataUser[0].avatar;
        } else {
            avatar = Notoken;
        };
        return avatar;
    }
    return (
        <>
            {
                data_product.length > 0 ?
                    (<div className="group-form-comment">
                        <Form
                            form={form}
                            onFinish={onFinish}
                        >
                            <Comment
                                avatar={
                                    <Avatar
                                        src={showIconImage(Notoken, dataUser)}
                                        alt="Han Solo"
                                    />
                                }
                            >
                                <StarRatings
                                    numberOfStars={5}
                                    starDimension="22px"
                                    name="start"
                                    starRatedColor="#fed330"
                                    starHoverColor="#fed330"
                                    changeRating={handleChange}
                                    rating={start}
                                    starEmptyColor="none"
                                />
                                <div className="group-lenght-content">
                                    <p>{contentCmt}/700</p>
                                </div>
                                <Form.Item
                                    name="content"
                                >
                                    <TextArea
                                        placeholder="Mời bạn để lại bình luận"
                                        rows={5}
                                        max={20}
                                        onChange={onChangeTextArea}
                                        maxLength={700}
                                    />
                                </Form.Item>
                                <Form.Item
                                    shouldUpdate={true}
                                >
                                    {
                                        () => (
                                            <Button
                                                htmlType="submit"
                                                type="primary"
                                                disabled={
                                                    !form.isFieldsTouched(true) ||
                                                    form.getFieldsError().filter(({ errors }) => errors.length).length ||
                                                    isFormValid
                                                }
                                                loading={submitting}
                                            >
                                                Thêm Bình Luận
                                            </Button>
                                        )
                                    }
                                </Form.Item>
                            </Comment>
                        </Form>
                    </div>) : <SpinLoading />
            }
        </>
    )

};

