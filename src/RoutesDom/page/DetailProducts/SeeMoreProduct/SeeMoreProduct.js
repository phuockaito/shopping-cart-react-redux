import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Pagination } from 'antd';
import Loading from 'Compoment/Spin/SpinLoading';
import StarRatings from "react-star-ratings";
import { Link } from 'react-router-dom';
import $ from "jquery";
import './index.css';
const formatter = new Intl.NumberFormat('vn');
export default function SeeMoreProduct(props) {
    const { listData, onChangePage } = props;
    // state

    const onChangePagination = (page) => {
        onChangePage(page);
        $("body,html").animate({ scrollTop: $(".list-see-more").offset().top - 160 }, 800);
    }
    const showPagination = data => {
        if (data.lengthData > 0) {
            return (
                <Pagination
                    onChange={onChangePagination}
                    total={data.lengthData}
                    defaultPageSize={16}
                />
            )
        }else{
            return <Loading/>
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
                    <p > Chưa có đánh giá</p>
                </>
            )
        }
    }
    const ShowSeeMore = data => {
        if (data.length > 0) {
            return (
                <div className="list-see-more">
                    {
                        data.map((listProduct) => (
                            <div className="item-products-see-more" key={listProduct._id}>
                                <Link
                                    to={`/${listProduct.key}/${listProduct.NSX.replace(/ /g, '-')}/${listProduct.name.replace(/ /g, '-')}/${listProduct._id}`}
                                    onClick={() => {
                                        $("html ,body").animate({ scrollTop: 0 }, 500);
                                    }}>
                                    <div className="ig-see-more">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={listProduct.poster[0].url}
                                            alt={listProduct._id}
                                            key={listProduct._id}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="name-see-more">
                                        <p>{listProduct.name}</p>
                                    </div>
                                </Link>
                                <div className="price-see-more">
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
        } else {
            return (<Loading />)
        }
    }
    return (
        <>
            <div className="group-see-more-products">
            <h3> SẢN PHẨM TƯƠNG TỰ</h3>
                {
                    ShowSeeMore(listData.data)
                }
                {
                    showPagination(listData)
                }


            </div>
        </>
    )
}