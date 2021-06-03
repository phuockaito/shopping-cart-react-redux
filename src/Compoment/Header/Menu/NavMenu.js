import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from "jquery";
import './NavMenu.css';
import logo from 'image/logo.png';
import * as actionTypes from 'Actions/index';

export default function NavMenu() {
    const dispatchEvent = useDispatch();
    const getListMenu = () => dispatchEvent(actionTypes.GetMenuResult());
    const list_menu = useSelector(state => state.menu);
    const { Adidas } = list_menu;
    const { Nike } = list_menu;
    const { Vans } = list_menu;
    const { NewBalance } = list_menu;
    const { Puma } = list_menu;
    const { Converse } = list_menu;
    useEffect(() => {
        getListMenu();
    }, []);
    const CloseMenu = () => {
        $('.ground-menu').removeClass('open');
        $('body').removeClass('active');
        $('.main-container').removeClass('active');
        $("html ,body").animate({ scrollTop: 0 }, 800);
    }
    return (
        <>
            <div className="ground-menu">
                <div className="nav-toggle">
                    <span>
                        <i className="fa fa-times" />
                        <Link to="/" className="logo" onClick={CloseMenu}>
                            <img src={logo} alt="logo" />
                        </Link>
                    </span>
                </div>

                <nav>
                    <ul className="menu">
                        <li>
                            <Link to="/" className="active" onClick={CloseMenu}>
                                trang chủ
                            </Link>
                        </li>
                        <li className="active-menu">
                            <a>
                                Adidas
                         <i className="fa fa-caret-down" />
                            </a>
                            <ul className="sub-menu">
                                {
                                    Adidas && (Adidas.sort().map((menu, key) => (
                                        <li key={key}><Link to={`/products/adidas/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                    )))
                                }
                            </ul>
                        </li>
                        <li className="active-menu">
                            <a>
                                Nike
                                 <i className="fa fa-caret-down" />
                            </a>
                            <ul className="sub-menu">
                                {
                                    Nike && (Nike.sort().map((menu, key) => (
                                        <li key={key}><Link to={`/products/nike/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                    )))
                                }
                            </ul>
                        </li>
                        <li className="active-menu">
                            <a>
                                Vans <i className="fa fa-caret-down" />
                            </a>
                            <ul className="sub-menu">
                                {
                                    Vans && (Vans.sort().map((menu, key) => (
                                        <li key={key}><Link to={`/products/vans/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                    )))
                                }
                            </ul>
                        </li>
                        <li className="active-menu">
                            <a>
                                new balance <i className="fa fa-caret-down" />
                            </a>
                            <ul className="sub-menu">
                                {
                                    NewBalance && (NewBalance.sort().map((menu, key) => (
                                        <li key={key}><Link to={`/products/new-balance/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                    )))
                                }
                            </ul>
                        </li>
                        <li className="active-menu">
                            <a>
                                puma <i className="fa fa-caret-down" />
                            </a>
                            <ul className="sub-menu">
                                {
                                    Puma && (Puma.sort().map((menu, key) => (
                                        <li key={key}><Link to={`/products/puma/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                    )))
                                }
                            </ul>
                        </li>
                        <li className="active-menu">
                            <a>
                                converse <i className="fa fa-caret-down" />
                            </a>
                            <ul className="sub-menu">
                                {
                                    Converse && (Converse.sort().map((menu, key) => (
                                        <li key={key}><Link to={`/products/converse/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                    )))
                                }
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
