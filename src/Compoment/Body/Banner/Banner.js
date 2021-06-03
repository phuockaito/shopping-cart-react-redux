import React from 'react';
import './Banner.css';
import Slider from "react-slick";
import anh1 from 'image/anh1.jpg';
import anh5 from 'image/anh5.jpg';
import anh2 from 'image/anh2.jpg';
import anh3 from 'image/anh3.jpg';
export default function Banner() {

    
    const dataBannerResult = [
        {
            banner: anh5,
        },
        {
            banner: anh3,
        },
        {
            banner: anh2,
        },
        {
            banner: anh1,
        }
    ]
    const settings = {
        infinite: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 550,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const ShowBanner = data => {
        if (data.length > 0) {
            return (
                <Slider {...settings} className="list-item-banner">
                    {
                        data.map((igBanner, index) => (
                            <div className="iteml-banner" key={index}>
                                <img src={igBanner.banner} alt={igBanner._id} />
                            </div>
                        ))
                    }
                </Slider>
            )
        } 
    }
    return (
        <>
            <div className="ground-banner">
                <div className="list-banner">
                    {
                        ShowBanner(dataBannerResult)
                    }
                </div>
            </div>
        </>
    )
}