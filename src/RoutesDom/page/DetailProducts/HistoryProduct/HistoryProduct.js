import React from 'react';
import StarRatings from "react-star-ratings";
import { Link } from 'react-router-dom';
import $ from "jquery";
import './style.css';
const formatter = new Intl.NumberFormat('vn');
export default function HistoryProduct({ _id, historyProduct }) {
    const historyProductOld = [...historyProduct];
    historyProductOld.forEach((product, index) => {
        if (product === null || product._id === _id) {
            historyProductOld.splice(index, 1);
        }
    })
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
                <div className="history-list-products">
                    {
                        data.map((listProduct) => (
                            <div className="item-products-list" key={listProduct._id}>
                                <Link
                                    to={`/${listProduct.key}/${listProduct.NSX.replace(/ /g, '-')}/${listProduct.name.replace(/ /g, '-')}/${listProduct._id}`}
                                    onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 800); }}
                                >
                                    <div className="ig-products-list">
                                        <img src={listProduct.poster[0].url} />
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
        }
    }

    return (
        <div className="group-history-products">
            {historyProductOld.length > 0 && <h3>SẢN PHẨM BẠN ĐÃ XEM</h3>}
            {
                showListProducts(historyProductOld)
            }
        </div>
    )
}