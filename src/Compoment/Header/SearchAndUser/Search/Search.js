import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './Search.css';
export default function Search() {
    const [keywordSearch, SetkeywordSearch] = useState('');
    const onChangeKeyword = e => {
        SetkeywordSearch({ [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="ground-search">
                <div className="main-search">
                    <div className="from-search">
                        <div className="search">
                            <form
                                onSubmit={
                                    (e) => { e.preventDefault(); }
                                }>
                                <i style={{ 'display': 'none' }} className="fa fa-long-arrow-left btn-close-search btn-search" />
                                <div className="input-search">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        onChange={onChangeKeyword}
                                        name='keyword'
                                    />
                                </div>
                                <div className="icon-search">

                                    <Link to={`/search/${keywordSearch.keyword}`} >
                                        <button
                                            type="submit"
                                              onClick={() => {
                                                  $("html ,body").animate({ scrollTop: 0 }, 500);
                                              }}
                                            className='btn-search'
                                        >
                                            <i className="fa fa-search" />
                                        </button>
                                    </Link>
                                </div>
                            </form>

                        </div>
                        <div className="show-menu-1000" style={{ 'display': 'none' }}>
                            <i className="fa fa-search btn-show-search" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
