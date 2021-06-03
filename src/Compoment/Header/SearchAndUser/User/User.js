import React from 'react';
import { Link } from 'react-router-dom';
import InforUser from './InforUser/InforUser';
import $ from 'jquery';
import './User.css';
const token = localStorage.getItem('token');
export default function User(props) {
    // state
    const scrollTop = () => {
        $("html ,body").animate({ scrollTop: 0 }, 500);
    }
    const { data } = props;
    return (
        <>
            <div className="ground-user">
                {!token && (
                    <Link
                        to='/login'
                        className="items-login"
                        onClick={() =>{ $("html ,body").animate({ scrollTop: 0})}}
                    >
                        đăng nhập
                    </Link>
                )}
                <div className="main-user">
                    <div className="frofile-login">
                        {
                            token ? (<InforUser data={data} />
                            ) : (
                                    <div className="login">
                                        <i style={{ 'display': 'none' }} className="fa fa-user btn-show-login" />
                                        <div className="show-login">
                                            <i className="fa fa-long-arrow-left btn-close-login" />
                                            <Link onClick={scrollTop} to="/login" className="item-login btn-close-login" >đăng nhập</Link>
                                            <Link onClick={scrollTop} to="/register" className="item-login btn-close-login">đăng ký</Link>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
