import React from 'react';
import './style.css';
import adidas from 'image/adidas.png';
import converse from 'image/converse.jpg';
import newBalance from 'image/newBalance.jpg';
import nike from 'image/nike.jpg';
import puma from 'image/puma.jpg';
import { Link } from 'react-router-dom';
import vans from 'image/vans.jpg';
import $ from 'jquery';
export default function Trademark() {
    const scrollTop = () => {
        $("html ,body").animate({ scrollTop: 0 }, 800);
    }
    return (
        <div className="group-trademark">
            <h3>THƯƠNG HIỆU</h3>
            <div className="container-trademark">
                <ul>
                    <li>
                        <Link 
                        onClick={scrollTop}
                        to="/product/adidas"
                        >
                            <img src={adidas} alt="adidas" />
                        </Link>
                    </li>
                    <li>
                        <Link 
                        onClick={scrollTop}
                        to="/product/converse"
                        >
                            <img src={converse} alt="converse" />
                        </Link>
                    </li>
                    <li>
                        <Link 
                        onClick={scrollTop}
                        to="/product/newBalance"
                        >
                            <img src={newBalance} alt="newBalance" />
                        </Link>
                    </li>
                    <li>
                        <Link 
                        onClick={scrollTop}
                        to="/product/nike"
                        >
                            <img src={nike} alt="nike" />
                        </Link>
                    </li>
                    <li>
                        <Link 
                        onClick={scrollTop}
                        to="/product/puma"
                        >
                            <img src={puma} alt="puma" />
                        </Link>
                    </li>
                    <li>
                        <Link 
                        onClick={scrollTop}
                        to="/product/vans"
                        >
                            <img src={vans} alt="vans" />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};