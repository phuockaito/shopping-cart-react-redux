import React, { useEffect, useState } from 'react';
import { Empty, Pagination } from 'antd';
import StarRatings from "react-star-ratings";
import { useRouteMatch } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import $ from "jquery";
import { useDispatch, useSelector } from 'react-redux';
import * as Actives from 'Actions/index';
import Loading from 'Compoment/Loading/loading';
import BtnLoading from 'Compoment/BtnLoading/BtnLoading';
import './search.css';
const formatter = new Intl.NumberFormat('vn');
export default function Search() {
    const dispatch = useDispatch();

    const { keyword } = useRouteMatch().params;
    const [page, setPage] = useState(1);
    const [loading_btn, setLoading_btn] = useState(false);
    const [loading_page, setLoading_page] = useState(false);
    // dispatch API 
    const getSearch = keyword => (dispatch(Actives.GetSearchResults(keyword)));

    const data = { keyword: keyword.trim(), page: page };
    // State
    const dataSearch = useSelector(state => state.search.data);
    const dataSearchLength = useSelector(state => state.search.lengthData);
    // API
    useEffect(() => {
        getSearch(data);
    }, [keyword, page]);
    useEffect(() => {
        document.querySelector('title').innerHTML = `Tìm kiếm - ${keyword.trim()}`;
        setLoading_page(true);
        setTimeout(() => {
            setLoading_page(false);
        }, 1300);
    }, [keyword]);

    useEffect(() => {
        setLoading_btn(false);
    }, [dataSearch.length]);
    const onChangePage = (page) => {
        setPage(page);
        $("html ,body").animate({ scrollTop: 0 }, 800);
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
    const ShowProducts = (data, lengthData) => {
        if (data.length > 0) {
            return (
                <div className="group-search">
                    {data.map(product => (
                        <div className="item-products-search" key={product._id}>
                            <Link
                                to={`/${product.key}/${product.NSX.replace(/ /g, '-')}/${product.name.replace(/ /g, '-')}/${product._id}`}
                                onClick={() => {
                                    $("html ,body").animate({ scrollTop: 0 }, 800);
                                }}
                            >
                                <div className="ig-products-search">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={product.poster[0].url}
                                        alt={product._id}
                                        key={product._id}
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                                <div className="name-products-search">
                                    <p>{product.name}</p>
                                </div>
                            </Link>
                            <div className="price-products-search">
                                <div className="group-price">
                                    <span>{formatter.format(product.price)} <u>đ</u></span>
                                </div>
                            </div>
                            <div className="group-start-review">
                                {
                                    showReview(product.rating, product.numReviews)
                                }
                            </div>
                        </div>

                    ))}
                </div>
            )
        }
        else if (lengthData === 0 || lengthData === null) {
            return (
                <div className="no-product-search">
                    <Empty />
                </div>
            )
        }
    }
    return (
        <>
            {loading_page && <Loading />}
            <div className="main-search">
                <div className="group-product-search">
                    <h3>Kết quả tìm kiếm cho '{keyword === 'undefined' ? '' : keyword}'</h3>
                    {ShowProducts(dataSearch, dataSearchLength)}
                    {
                        (loading_btn) && (<BtnLoading />)
                    }
                    {
                        showPagination(dataSearchLength)
                    }
                </div>
            </div>
        </>
    )
}