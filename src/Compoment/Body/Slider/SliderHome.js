import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import './slider.css';
import StarRatings from "react-star-ratings";
import * as Actives from 'Actions/index';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import $ from "jquery";
export default function SliderHome() {
    const formatter = new Intl.NumberFormat('vn');
    const dispatch = useDispatch();
    const dataSilder = useSelector(state => state.silder);
    const getProductsSilder = key => dispatch(Actives.GetProductsSilderRequest(key));
    useEffect(() => {
        getProductsSilder("Converse")
    }, [])
    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 280,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
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
    const ShowSilder = data => {

        if (data.length > 0) {
            return (
                <Slider {...settings}>
                    {
                        data.map(silder => (
                            <div className="iteml-silder" key={silder._id}>
                                <Link
                                    to={`/${silder.key}/${silder.NSX.replace(/ /g, '-')}/${silder.name.replace(/ /g, '-')}/${silder._id}`}
                                    onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 800); }}
                                >
                                    <div className="ig-silder">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={silder.poster[0].url}
                                            alt={silder._id}
                                            key={silder._id}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="name-silder">
                                        <p>{silder.name}</p>
                                    </div>
                                    <div className="price-sidler">
                                        <span>{formatter.format(silder.price)} <u>đ</u></span>
                                    </div>
                                    <div className="group-start-review">
                                        {
                                            showReview(silder.rating, silder.numReviews)
                                        }
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </Slider>
            )
        }  
    }
    return (
        <>
            <div className="group-silder">
                <h3>KHUYẾN MÃI HOT NHẤT</h3>
                <div className="silder">
                    {
                        ShowSilder(dataSilder)
                    }
                </div>
            </div>
        </>
    )
}