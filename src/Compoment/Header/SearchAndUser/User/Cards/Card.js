import React from 'react';
import './Card.css'
import { useSelector } from 'react-redux';
import { Badge} from 'antd';
import { Link } from 'react-router-dom';
import $ from "jquery";
export default function Card() {
    const dataCard = useSelector(state => state.card);
    return (
        <>
            <div className="ground-card">
                <div className="main-card">
                    <div className="card-user">
                        <Link
                            to="/cart"
                            onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 800); }}
                        >
                            <Badge count={dataCard.length} overflowCount={99}>
                                    <i className="fa fa-shopping-cart" />
                            </Badge>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
