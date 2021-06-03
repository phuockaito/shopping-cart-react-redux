import React, { useEffect, useState } from 'react';
import { Select, Form, Button, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import StarRatings from "react-star-ratings";
import Loading from 'Compoment/Loading/loading';
import SpinLoading from 'Compoment/Spin/SpinLoading';
import SeeMoreProduct from './SeeMoreProduct/SeeMoreProduct';
import HistoryProduct from './HistoryProduct/HistoryProduct';
import Comment from './Comment/CommentProducts';
import Slider from "react-slick";
import * as Actives from 'Actions/index';
import imgFreeShip from 'image/freeship.png';
import './style.css';
const { Option } = Select;
const formatter = new Intl.NumberFormat('vn');

export default function DetailProducts() {
    let historyProduct = JSON.parse(localStorage.getItem('historyProduct'))  || [];
    const [form] = Form.useForm();
    const { key, name, _id } = useRouteMatch().params;
    document.querySelector('title').innerHTML = name.replace(/-/g, ' ').toUpperCase();
    const dispatch = useDispatch();
    //state
    const [loading, setloading] = useState(true);
    const [quantity, Setquantity] = useState(1)
    const [dataBuyCart, SetDataBuyCart] = useState();

    // API 
    const getProductsId = id => dispatch(Actives.GetProductsIDRequest(id));
    const getProductsType = (key) => dispatch(Actives.GetProductsTypeRequest(key));
    const addToCart = (product, quantity) => dispatch(Actives.addToCart(product, quantity));
    setTimeout(() => {
        setloading(false);
    }, 1300);
    // Hook
    useEffect(() => {
        let NewComment = [...historyProduct];
        NewComment.push(dataProductsId[0]);
        localStorage.setItem('historyProduct', JSON.stringify(NewComment));
    }, []);
    useEffect(() => {
        const data = {
            name: key,
            page: 1,
            sort_price: 0
        }
        Setquantity(1)
        getProductsType(data);
        setloading(true);
        getProductsId(_id);
        setTimeout(() => {
            setloading(false);
        }, 1300);
        const historyProductOld = [...historyProduct];
        historyProductOld.forEach((product, index) => {
            if (product === null || product._id === _id) {
                historyProductOld.splice(index, 1);
            }
        })
        historyProductOld.unshift(dataProductsId[0]);
        localStorage.setItem('historyProduct', JSON.stringify(historyProductOld));
    }, [_id, key]);
    // data
    const dataProductsType = useSelector(state => state.productsType);
    const dataProductsId = useSelector(state => state.ID);

    const showQuantity = (products) => {
        SetDataBuyCart(products);
    }
    const onFinish = (values) => {
        const data = {
            key: dataBuyCart.key,
            NSX: dataBuyCart.NSX,
            _id: dataBuyCart._id,
            name: dataBuyCart.name,
            price: dataBuyCart.price,
            poster: dataBuyCart.poster,
            size: values.size,
        }
        addToCart(data, quantity);
    }

    // function
    const onChangePage = _page => {
        const data = {
            name: key,
            page: _page,
            sort_price: 0
        }
        getProductsType(data);
    }
    const showReview = (numReviews, rating) => {
        const rate = (rating / numReviews);
        if (numReviews > 0) {
            return (
                <div className="revews-products">
                    <div className="start-review">
                        <StarRatings
                            starDimension="22px"
                            starRatedColor="#fed330"
                            starHoverColor="#fed330"
                            rating={rate}
                            starEmptyColor="white"
                        />
                        <span>
                            {rate.toFixed(1)}
                        </span>
                    </div>
                    <p>{numReviews} đánh giá</p>

                </div >
            )
        }
        else {
            return (
                <>
                    <StarRatings
                        starDimension="22px"
                        starRatedColor="#fed330"
                        starHoverColor="#fed330"
                        starEmptyColor="none"
                        numberOfStars={5}
                    />
                    <p style={{ 'color': '#ee4d2d' }}> Chưa có đánh giá !</p>
                </>
            )
        }
    }
    const showDetaiProducts = data => {
        const imageArray = [];
        if (data.length > 0) {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                imageArray.push(element.poster);
            }
            const settings = {
                customPaging: function (i) {
                    return (
                        <a>
                            <img src={imageArray[0][i++].url} />
                        </a>
                    );
                },
                dots: true,
                dotsClass: "group-array-image",
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
            };
            return (
                <>
                    {data.map((product, index) => (
                        <div className="group-detail-products" key={index}>

                            <div className="group-detail"  >
                                <div className="group-image-detail">
                                    <Slider {...settings}>
                                        {
                                            imageArray[0].map((image, index) => (
                                                <div className="image-arry-silder" key={index}>
                                                    <Image src={image.url} alt={image._id} />
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                                <div className="gruop-information-detail">
                                    <div className="information-detail">
                                        <div className="name-detail">
                                            <h3>{product.name}</h3>
                                        </div>
                                        <div className="group-description-more">
                                            <div className="description-more-info">
                                                <div className="group-rate-Review">
                                                    {showReview(product.numReviews, product.rating)}
                                                </div>
                                                <p>mã sản phẩm: <span>{product._id}</span></p>
                                                <p>nhà xản xuất: <span>{product.key}</span></p>
                                                <p>bộ sưu tập: <span>{product.collections}</span></p>
                                                <p>loại sản phẩm: <span>{product.productType}</span></p>
                                                <p>dòng sản phẩm: <span>{product.NSX}</span></p>
                                                <p>màu sắc: <span>{product.color}</span></p>
                                                <p>giới tính: <span>{product.sex}</span></p>
                                            </div>
                                        </div>
                                        <div className="group-free-detail">
                                            <div className="img-free-detail">
                                                <img src={imgFreeShip} alt="free-ship" />
                                            </div>
                                            <p>Miễn phí giao hàng (tối đa 30k)cho đơn hàng từ 249k Xem chi tiết</p>
                                        </div>
                                        <Form

                                            form={form}
                                            onFinish={onFinish}
                                        >
                                            <div className="group-buys-detail">
                                                <div className="group-quantity-number">
                                                    <span>số lượng</span>
                                                    <div className="quantity-number">
                                                        <div
                                                            className="click-left"
                                                            onClick={() => { Setquantity(quantity === 1 ? 1 : quantity - 1) }}
                                                        >-
                                                </div>
                                                        <p>{quantity}</p>
                                                        <div
                                                            className="click-right"
                                                            onClick={() => { Setquantity(quantity + 1) }}
                                                        >+
                                                 </div>
                                                    </div>
                                                </div>
                                                <div className="buys-detail">
                                                    <Button
                                                        type="primary" htmlType="submit"
                                                        onClick={() => {
                                                            showQuantity(
                                                                {
                                                                    key: product.key,
                                                                    NSX: product.NSX,
                                                                    _id: product._id,
                                                                    name: product.name,
                                                                    price: product.price,
                                                                    poster: product.poster[0].url,
                                                                }
                                                            )
                                                        }}
                                                    >
                                                        <i className="fa fa-shopping-cart" />
                                                chọn mua hàng
                                            </Button>
                                                </div>
                                            </div>

                                            <div className="group-price-size">
                                                <div className="group-price">
                                                    <span>{formatter.format(product.price)} <u>đ</u></span>

                                                </div>
                                                <div className="group-size">
                                                    <Form.Item
                                                        name="size"
                                                        label="Chọn kích cỡ"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'vui lòng chọn size',
                                                            },
                                                        ]}
                                                    >
                                                        <Select placeholder="size" style={{ 'width': '100%' }}>
                                                            {
                                                                product.size.map(size => (
                                                                    <Option value={size.options} key={size.options}>{size.options}</Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                            <div className="group-description">
                                <h2>Mô tả Sản phẩm</h2>
                                <div className="group-description-text">
                                    {ReactHtmlParser(product.description)}
                                </div>
                            </div>
                        </div>
                    ))}

                </>
            )
        } else return (<SpinLoading />)
    }
    return (
        <>
            <div className="container-detail-products">
                <div className="group-detai">
                    {
                        loading && (<Loading />)
                    }
                    {
                        showDetaiProducts(dataProductsId)
                    }
                    <Comment
                        idProduct={_id}
                        data_product={dataProductsId}
                    />
                    <SeeMoreProduct
                        listData={dataProductsType}
                        onChangePage={onChangePage}
                    />
                    < HistoryProduct
                        historyProduct={historyProduct}
                        _id={_id}
                    />
                </div>
            </div>
        </>
    )
};