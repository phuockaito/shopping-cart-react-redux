import React from 'react';
import SliderHome from 'Compoment/Body/Slider/SliderHome'
import Banner from 'Compoment/Body/Slider/SliderHome';
import ProductsType from 'Compoment/Body/Products/Type/ProductsType';
import ListProducts from 'Compoment/Body/Products/ListProduct/ListProducts';
import Trademark from 'Compoment/Body/Trademark/Trademark';
export default function Home() {
    document.querySelector('title').innerHTML = 'Kaito Shop';

    return (
        <>
            <div className="group-home">
                <div className="home">
                    <Banner />
                    <Trademark />
                    <ProductsType />
                    <SliderHome />
                    <ListProducts />
                </div>
            </div>
        </>
    )
}