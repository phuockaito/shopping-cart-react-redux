import React, { useEffect, useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination, Select } from 'antd';
import StarRatings from "react-star-ratings";
import Loading from 'Compoment/Loading/loading';
import SpinLoading from 'Compoment/Spin/SpinLoading';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import $ from "jquery";
import './productsNSX.css';
import * as actionTypes from 'Actions/index';
const { Option } = Select;
export default function ProductsNSX() {
    const formatter = new Intl.NumberFormat('vn');
    const [loading, setloading] = useState(true);
    const [page, setPage] = useState(1);
    const { NSX, key } = useRouteMatch().params;
    const [sort_price, sort_price_Set] = useState(1);
    const dispatchEvent = useDispatch();
    const dataReq = { page, NSX, key, sort_price };
    // dispatch
    const getProductsNSX = data => dispatchEvent(actionTypes.GetProductsNSXRequest(data));
    const dataProductNSX = useSelector(state => state.NSX.data);
    const lengthData = useSelector(state => state.NSX.lengthData);
    // userfff
    useEffect(() => {
        getProductsNSX(dataReq);
    }, [page, sort_price]);
    useEffect(() => {
        getProductsNSX(dataReq);
        setloading(true);
        setTimeout(() => {
            setloading(false);
        }, 1300);
        document.querySelector('title').innerHTML = NSX.replace(/-/g, ' ').toUpperCase();
    }, [NSX]);
    // funtion
    const onChangePagination = (page) => {
        setPage(page);
        $("body,html").animate({ scrollTop: 0 }, 800);
    }
    const onChangeFilter = value => {
        sort_price_Set(value.value)
    }
    const showPagination = lengthData => {
        if (lengthData > 0) {
            return (
                <Pagination
                    onChange={onChangePagination}
                    total={lengthData}
                />
            )
        }

    }
    const showReview = (rating, numReviews) => {

        const rate = (rating / numReviews);
        if (numReviews > 0) {
            return (
                <div className="revews-products">
                    <div className="start-review">
                        <StarRatings
                            starDimension="16px"
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
                        starDimension="16px"
                        starRatedColor="#fed330"
                        starHoverColor="#fed330"
                        starEmptyColor="none"
                        numberOfStars={5}
                    />
                    <p >Chưa có đánh giá</p>
                </>
            )
        }
    }
    const showProducts = data => {
        if (data.length > 0) {
            return (
                <div className="list-products-nsx">
                    {data.map((products_nsx) => (
                        <div className="item-products-nsx" key={products_nsx._id}>
                            <Link
                                to={`/${products_nsx.key}/${products_nsx.NSX.replace(/ /g, '-')}/${products_nsx.name.replace(/ /g, '-')}/${products_nsx._id}`}
                                onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 500); }}
                            >
                                <div className="ig-products-nsx">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={products_nsx.poster[0].url}
                                        alt={products_nsx._id}
                                        key={products_nsx._id}
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                                <div className="name-products-nsx">
                                    <p>{products_nsx.name}</p>
                                </div>
                            </Link>
                            <div className="price-products-nsx">
                                <div className="group-price">
                                    <span>{formatter.format(products_nsx.price)}đ</span>
                                </div>
                            </div>
                            <div className="group-start-review">
                                {
                                    showReview(products_nsx.rating, products_nsx.numReviews)
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )
        } else return (<SpinLoading />)
    }
    return (
        <>
            <div className="container-products-nsx">
                <div className="products-nsx">

                    {
                        loading && (<Loading />)
                    }
                    <div className="group-products-nsx">
                        <h3>{NSX.replace(/-/g, ' ')}</h3>
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
                            showProducts(dataProductNSX)
                        }
                        {
                            showPagination(lengthData)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}