import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from 'Actions/index';
import StarRatings from "react-star-ratings";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './listProduct.css';
import $ from "jquery";
import SpinLoading from 'Compoment/Spin/SpinLoading'
import BtnLoading from 'Compoment/BtnLoading/BtnLoading';
export default function ListProducts() {
    const formatter = new Intl.NumberFormat('vn');
    const [page, setPage] = useState(1);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const getListProducts = (page) => dispatch(Actions.GetProductsRequest(page));
    // dispatch API
    const dataGetListProducts = useSelector(state => state.products.data);
    const lengthData = useSelector(state => state.products.lengthData);
    // useEffect  API
    useEffect(() => {
        getListProducts(page);
    }, [page]);
    const loadingData = page => {
        setloading(true);
        setPage(page + 1);
    };
    useEffect(() => {
        setloading(false);
    }, [dataGetListProducts.length]);
    const showReview = (rating, numReviews) => {
        const rate = (rating / numReviews);
        if (numReviews > 0) {
            return (
                <>
                    <StarRatings
                        starDimension="16px"
                        starRatedColor="#fed330"
                        starHoverColor="#fed330"
                        rating={rate}
                        starEmptyColor="white"
                    />
                    <p>{numReviews} Đánh giá</p>

                </ >
            )
        }
        else {
            return (
                <>
                    <StarRatings
                        starDimension="16px"
                        starRatedColor="#fed330"
                        starHoverColor="#fed330"
                        starEmptyColor="none"
                        numberOfStars={5}
                    />
                    <p> Chưa có đánh giá</p>
                </>
            )
        }
    }
    const showListProducts = (data) => {
        if (data.length > 0) {

            return (
                <div className="list-Products">
                    {
                        data.map((listProduct) => (
                            <div className="item-products-list" key={listProduct._id}>
                                <Link
                                    to={`/${listProduct.key}/${listProduct.NSX.replace(/ /g, '-')}/${listProduct.name.replace(/ /g, '-')}/${listProduct._id}`}
                                    onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 800); }}
                                >
                                    <div className="ig-products-list">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={listProduct.poster[0].url}
                                            alt={listProduct._id}
                                            key={listProduct._id}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="name-products-list">
                                        <p>{listProduct.name}</p>
                                    </div>
                                </Link>
                                <div className="price-products-list">
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
                        ))}
                </div>
            )
        } else {
            return (<SpinLoading />)
        }
    }
    return (
        <div className="group-list-Products">
            <h3>TẤT CẢ SẢN PHẨM</h3>
            {
                showListProducts(dataGetListProducts)
            }
            {(loading) && (<BtnLoading />)}
            {
                (!loading && dataGetListProducts.length < lengthData) && (
                    <button
                        className="load-data"
                        onClick={() => loadingData(page)}
                    >
                        xem thêm
                    </button>
                )
            }
        </div>
    )
}