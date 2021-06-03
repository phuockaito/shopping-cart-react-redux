import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SpinLoading from 'Compoment/Spin/SpinLoading';
import StarRatings from "react-star-ratings";
import *as Actives from 'Actions/index';
import $ from "jquery";
import './productsType.css';
export default function ProductsType() {
    const formatter = new Intl.NumberFormat('vn');
    const dispatch = useDispatch();
    const keyProducts = ["Nike", "Adidas", "Vans", "Puma"];
    const RandomSlider = Math.random() * keyProducts.length;
    const indexProducts = Math.trunc(RandomSlider);
    const nameProducts = keyProducts[indexProducts]
    const dataProductsType = useSelector(state => state.productsType.data);
    ;
    const getProductsType = (data) => dispatch(Actives.GetProductsTypeRequest(data));
    useEffect(() => {
        const data = {
            name: nameProducts,
            page: 1,
            sort_price: 0
        }
        getProductsType(data);
    }, []);

    // add card function

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
    const ShowProducts = data => {

        if (data.length > 0) {

            const rate = (data.rating / data.numReviews);
            return (
                <div className="grouducts-type">
                    {
                        data.map(product => (
                            <div className="item-products-type" key={product._id}>
                                <Link
                                    to={`/${product.key}/${product.NSX.replace(/ /g, '-')}/${product.name.replace(/ /g, '-')}/${product._id}`}
                                    onClick={() => {
                                        $("html ,body").animate({ scrollTop: 0 }, 800);
                                    }}>
                                    <div className="ig-products-type">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={product.poster[0].url}
                                            alt={product._id}
                                            key={product._id}
                                            height="100%"
                                            width="100%"
                                        />                            </div>
                                    <div className="name-products-type">
                                        <p>{product.name}</p>
                                    </div>
                                </Link>
                                <div className="price-products-type">
                                    <div className="group-price">
                                        <span>{formatter.format(product.price)} <u>đ</u> </span>
                                    </div>
                                </div>
                                <div className="group-start-review">
                                    {
                                        showReview(product.rating, product.numReviews)
                                    }
                                </div>
                            </div>

                        ))
                    }
                </div>
            )
        }
        else {
            return (
                <SpinLoading />
            )
        }
    }
    return (
        <>
            <div className="group-products-type">
                <h3> DÀNH RIÊNG CHO BẠN</h3>
                {
                    ShowProducts(dataProductsType)
                }
            </div>
        </>
    )
}