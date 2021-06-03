import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Empty, Tooltip, Drawer, Button, Form, Input, Select, InputNumber } from 'antd';
import $ from "jquery";
import * as actionTypes from 'Actions/index';
import dataCity from 'data.json';
import './style.css';
const token = localStorage.getItem('token');
const formatter = new Intl.NumberFormat('vn');
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

export default function CartProduct() {
    const { TextArea } = Input;
    let history = useHistory();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    // state
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [visible, setVisible] = useState(false);
    let totalSumCart = 0;
    useEffect(() => {
        document.querySelector('title').innerHTML = 'Giỏ Hàng';
        visible ? $('body').addClass('active') : $('body').removeClass('active');
    }, [visible]);
    useEffect(() => {
        form.resetFields(['district']);
        form.resetFields(['commune']);
    }, [city]);
    useEffect(() => {
        form.resetFields(['commune']);
    }, [district]);
    // dispatch
    const deleteToCart = cart => dispatch(actionTypes.deleteToCart(cart));
    const updateQuantity = (index, quantity) => dispatch(actionTypes.updateQuantity(index, quantity));
    const addToCartAPI = data => dispatch(actionTypes.addToCartRequestAPI(data));
    const dataCart = useSelector(state => state.card);

    // function
    const onClose = () => {
        setVisible(false);
    };
    const checkToken = () => {
        if (token) {
            setVisible(true);
        } else {
            history.push("/login");
        }
    }
    const deleteCart = (index, cart) => {
        deleteToCart({ index, cart });
    }
    const onUpdateQuantity = (index, quantity) => {
        if (quantity > 0) {
            updateQuantity(index, quantity);
        }
    }
    const onFinish = (values) => {
        const { city, district, commune, incubation, numberPhome, payment } = values;
        const data = {
            token: token,
            inforCart: {
                address: `${incubation} - ${commune} - ${district} - ${city}`,
                phone: numberPhome,
                totalSum: totalSumCart,
                cart: dataCart,
                payment: payment
            }
        };
        if (data) {
            addToCartAPI(data);
        }
    }
    const onChangeCity = (City) => {
        setCity(City);
    };
    const onChangeDistrict = District => {
        setDistrict(District);
    }

    const showCardProducts = data => {
        if (data.length > 0) {
            return (
                <>
                    <div className="group-card-iteml">
                        <div className="khung-card-iteml">
                            {
                                data.map((card, index) => (
                                    <div className="card-iteml" key={index}>
                                        <button
                                            className="detele-iteml"
                                            onClick={() => { deleteCart(index, data) }}
                                        >
                                            <Tooltip placement="right" title='Xóa sản phẩm'>
                                                <i className="fa fa-trash-o" />
                                            </Tooltip>
                                        </button>
                                        <div className="card-image">
                                            <img src={card.product.poster} alt={card.product._id} title='Xem chi tiết' />
                                        </div>
                                        <div className="card-name">
                                            <Link title='Xem chi tiết'
                                                to={`/${card.product.key}/${card.product.NSX.replace(/ /g, '-')}/${card.product.name.replace(/ /g, '-')}/${card.product._id}`}
                                                onClick={() => {
                                                    $("html ,body").animate({ scrollTop: 0 }, 800);
                                                }}>
                                                <p>{card.product.name} - <span>size {card.product.size}</span></p>
                                            </Link>
                                        </div>
                                        <div className="card-rice">
                                            <span>Giá</span>
                                            <p>{formatter.format(card.product.price)} <u>đ</u></p>
                                        </div>
                                        <div className="card-quantity">
                                            <span>Số lượng</span>
                                            <div className="quantity-number">
                                                <button
                                                    className="click-left"
                                                    onClick={() => { onUpdateQuantity(index, card.quantity - 1) }}
                                                >-
                                    </button>
                                                <p>{card.quantity}</p>
                                                <button
                                                    className="click-right"
                                                    onClick={() => { onUpdateQuantity(index, card.quantity + 1) }}
                                                >+
                                     </button>

                                            </div>
                                        </div>
                                        <p className='total-sum'>Tổng cộng: {formatter.format(totalSum(card))} <u>đ</u> </p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="card-total-money">
                            <div className="totle-money">
                                <h3>Thành tiền</h3>
                                <div className="group-totle-money">
                                    <p>{formatter.format(showTotalAmount(data))} <u>đ</u></p>
                                    <span>(Đã bao gồm VAT nếu có)</span>
                                </div>
                                <button className="check-out" onClick={checkToken}>Tiến hành đặt hàng</button>
                            </div>
                        </div>
                    </div>

                    {/* -------------- */}
                    <div className="group-check-out">

                        <Drawer
                            title="Thông tin nhận hàng"
                            width={500}
                            onClose={onClose}
                            visible={visible}
                            className="container-checkout"
                        >
                            <Form
                                {...formItemLayout}
                                form={form}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="city"
                                    label="Tỉnh/Thành phố"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn tỉnh hoặc thành phố bạn ở !',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Tỉnh/Thành phố"
                                        optionFilterProp="children"
                                        onChange={onChangeCity}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            dataCity.map((city, index) => (
                                                <Option value={city.name} key={index}>{city.name}</Option>
                                            ))
                                        }
                                    </Select >
                                </Form.Item>

                                <Form.Item
                                    name="district"
                                    label="Quận/Huyện"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn quận hoặc huyện nơi bạn !',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Quận/Huyện"
                                        optionFilterProp="children"
                                        onChange={onChangeDistrict}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            dataCity.map((itemCity, index) => itemCity.name === city && (
                                                itemCity.huyen.map((huyen) => (
                                                    <Option value={huyen.name} key={index}>{huyen.name}</Option>
                                                ))
                                            ))
                                        }
                                    </Select >
                                </Form.Item>
                                <Form.Item
                                    name="commune"
                                    label="Xã/Thị Trấn"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn xã bạn ở !',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Xã/Thị Trấn"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            dataCity.map(itemCity => itemCity.name === city && (
                                                itemCity.huyen.map(huyen => huyen.name === district && (
                                                    huyen.xa.sort().map((xa, index) => (
                                                        <Option value={xa.name} key={index}>{xa.name}</Option>
                                                    ))
                                                ))
                                            ))
                                        }
                                    </Select >
                                </Form.Item>
                                <Form.Item
                                    name="incubation"
                                    label="Ấp/Số Nhà/Tên Đường"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Địa chỉ cụ thể !',
                                        }
                                    ]}
                                >
                                    <TextArea
                                        placeholder="địa chỉ cụ thể: ấp, số nhà, tên đường..."
                                        rows={4}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="numberPhome"
                                    label="Số Điện Thoại"
                                    className="group-phone"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập đúng số điện thoại !',
                                        }
                                    ]}
                                >
                                    <InputNumber type="number" />
                                </Form.Item>

                                <Form.Item
                                    name="payment"
                                    label="Thanh toán"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn phuong thức thanh toán',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Thanh toán khi nhận hàng"
                                    >
                                        <Option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</Option>
                                    </Select >
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="btn-register"
                                    >
                                        Hoàn tất
                                            </Button>
                                </Form.Item>
                            </Form>
                        </Drawer>

                    </div>
                </>
            )
        } else {
            $('body').removeClass('active');
            return (
                <div className="group-nofuound">
                    <Empty />
                </div>
            )
        }
    }
    const showTotalAmount = cart => {
        var total = 0;
        if (cart.length > 0) {
            for (let index = 0; index < cart.length; index++) {
                total += cart[index].product.price * cart[index].quantity;
            }
        };
        totalSumCart = total;
        return total;
    }
    const totalSum = cart => {
        return cart.product.price * cart.quantity;
    }
    return (
        <>
            <div className="container-card">
                <div className="group-card">
                    <h3>GIỎ HÀNG <span>({dataCart.length} sản phẩm)</span></h3>
                    {showCardProducts(dataCart)}
                </div>
            </div>
        </>
    );
};
