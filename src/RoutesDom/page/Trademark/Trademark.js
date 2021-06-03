import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Empty, Pagination, Select } from 'antd';
import StarRatings from "react-star-ratings";
import *as Actives from 'Actions/index';
import $ from "jquery";
import './style.css';
const { Option } = Select;
export default function Trademark() {
    const formatter = new Intl.NumberFormat('vn');
    const { name_Trademark } = useRouteMatch().params;
    const [page, setPage] = useState(1);
    const [sort_price, sort_price_Set] = useState(1);
    document.querySelector('title').innerHTML = name_Trademark.toUpperCase();
    const dispatch = useDispatch();
    const getProductsType = (data) => dispatch(Actives.GetProductsTypeRequest(data));
    useEffect(() => {
        const data = {
            name: name_Trademark,
            page: page,
            sort_price: sort_price
        }
        getProductsType(data);
    }, [sort_price, page]);
    // state
    const dataTrademark = useSelector(state => state.productsType.data);
    const lengthData = useSelector(state => state.productsType.lengthData);
    //function
    const onChangePage = (page) => {
        setPage(page);
        $("html ,body").animate({ scrollTop: 0 }, 800);
    }
    const onChangeFilter = value => {
        sort_price_Set(value.value)
    }
    const showPagination = data => {
        if (data > 0) {
            return (
                <Pagination
                    onChange={onChangePage}
                    total={data}
                    defaultPageSize={16}
                />
            )
        }
    }
    const showReview = (rating,numReviews) => {
        const rate = (rating / numReviews);
        if (numReviews > 0) {
            return (
                <div className="revews-products">
                    <div className="start-review">
                        <StarRatings
                            starDimension="20px"
                            starRatedColor="#fed330"
                            starHoverColor="#fed330"
                            rating={rate}
                            starEmptyColor="white"
                        />
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
                    <p > Chưa có đánh giá !</p>
                </>
            )
        }
    }
    const ShowProducts = data => {
        if (data.length > 0) {
            return (
                <div className="product-trademark">
                    {
                        data.map((listProduct) => (
                            <div className="item-products-trademark" key={listProduct._id}>
                                <Link
                                    to={`/${listProduct.key}/${listProduct.NSX.replace(/ /g, '-')}/${listProduct.name.replace(/ /g, '-')}/${listProduct._id}`}
                                    onClick={() => {
                                        $("html ,body").animate({ scrollTop: 0 }, 800);
                                    }}>
                                    <div className="ig-products-trademark">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={listProduct.poster[0].url}
                                            alt={listProduct._id}
                                            key={listProduct._id}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="name-products-trademark">
                                        <p>{listProduct.name}</p>
                                    </div>
                                </Link>
                                <div className="price-products-trademark">
                                    <div className="group-price">
                                        <span>{formatter.format(listProduct.price)} <u>đ</u></span>
                                    </div>
                                </div>
                                <div className="group-start-review">
                                {
                                    showReview(listProduct.rating, listProduct.numReviews)
                                }
                            </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
        else return (
            <div className="no-product-trademark">
                <Empty />
            </div>
        )
    }
    return (
        <>
         
            <div className="group-product-trademark">
                <div className="container-product-trademark">
                    <h3>{name_Trademark}</h3>
                    <div className="filter-price">
                        <Select
                            labelInValue
                            defaultValue={{ value: 'Giá tăng dần' }}
                            style={{ width: 140 }}
                            onChange={onChangeFilter}
                        >
                            <Option value="1">Giá tăng dần</Option>
                            <Option value="-1">Giá giảm dần</Option>
                        </Select>

                    </div>
                    {
                        ShowProducts(dataTrademark)
                    }
                    {
                        showPagination(lengthData)
                    }
                </div>
            </div>
        </>
    )
}