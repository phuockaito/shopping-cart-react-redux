import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from "jquery";
import './Header.css';
import Search from './SearchAndUser/Search/Search';
import User from './SearchAndUser/User/User';
import Card from './SearchAndUser/User/Cards/Card';
import * as actionTypes from 'Actions/index';
import logo from 'image/logo.png';
const token = localStorage.getItem('token');
export default function Header() {

    const dispatch = useDispatch();
    const informationUserRequest = token => dispatch(actionTypes.informationUserRequestAPI(token));
    // dispatch
    useEffect(() => {
        if (token) {
            informationUserRequest(token);
        }
    }, []);
   
    //fetch API
    const dataUser = useSelector(state => state.User.user);
  
    return (
        <>
            <div className="ground-header">
                <div className="main-header">
                    <div className="main-item-logo">
                        <Link
                            to="/"
                            onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 800); }}
                        >
                            <img src={logo} alt=""/>
                            {/* Kaito Shop */}
                        </Link>
                    </div>
                    <Search />
                    <div style={{ 'display': 'none' }} className="totle-menu">
                        <i className="fa fa-bars" />
                    </div>
                    <Card />
                    <User data={dataUser} />
                </div>
            </div>
        </>
    )
}
