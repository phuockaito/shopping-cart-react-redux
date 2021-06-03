import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Empty, Tabs } from 'antd';
import CartItem from './CartItem';
import CartInforBuy from './CartInforBuy';
import * as Actions from 'Actions/index';
import './style.css';
const token = localStorage.getItem('token');
const { TabPane } = Tabs;

export default function HistoryCart() {
    const dispatch = useDispatch();
    // dispatch
    const getHistoryCart = token => dispatch(Actions.historyCartAPI(token));
    const updataCartStatusOrderAPI = data => dispatch(Actions.updataCartStatusOrderAPI(data));
    // useEffect
    document.querySelector('title').innerHTML = 'Lịch sử mua hàng';
    useEffect(() => {
        getHistoryCart(token);
    }, []);
    // state
    const dataHistoryCart = useSelector(state => state.HistoryCart);
    // function
    const showProductsBuyCartAll = data => {
        if (data.length > 0) {
            return (
                data.map((itemcart, index) => (
                    <div className="cart-item-history" key={index}>
                        {
                            itemcart.cart.map((product, index) => (
                                <CartItem data={product} key={index} />
                            ))
                        }
                        <div className="group-info-buy-cart">
                            <CartInforBuy
                                updataCartStatusOrderAPI={updataCartStatusOrderAPI}
                                token={token}
                                data={itemcart}
                                id_card={itemcart._id
                                }
                            />
                        </div>
                    </div>
                ))
            )
        } else return (
            <div className="group-nofuound">
                <Empty />
            </div>

        )
    }
    // show Pending
    const showProductsBuyCartAllPending = data => {
        if (data.length > 0) {
            return (
                data.map((itemcart, index) => (itemcart.success) === false && (
                    <div className="cart-item-history" key={index}>
                        {
                            itemcart.cart.map((product, index) => (
                                <CartItem data={product} key={index} />
                            ))
                        }
                        <div className="group-info-buy-cart">
                            <CartInforBuy
                                updataCartStatusOrderAPI={updataCartStatusOrderAPI}
                                token={token}
                                data={itemcart}
                                id_card={itemcart._id
                                }
                            />

                        </div>
                    </div>
                ))
            )
        } else return (
            <div className="group-nofuound">
                <Empty />
            </div>

        )
    }
    // show Pending
    const showProductsBuyCartAllFinish = data => {
        if (data.length > 0) {
            return (
                data.map((itemcart, index) => (itemcart.success) === true && (
                    <div className="cart-item-history" key={index}>
                        {
                            itemcart.cart.map((product, index) => (
                                <CartItem data={product} key={index} />
                            ))
                        }
                        <div className="group-info-buy-cart">
                            <CartInforBuy
                                updataCartStatusOrderAPI={updataCartStatusOrderAPI}
                                token={token}
                                data={itemcart}
                                id_card={itemcart._id
                                }
                            />

                        </div>
                    </div>
                ))
            )
        } else return (
            <div className="group-nofuound">
                <Empty />
            </div>

        )
    };

    // show  status order
    const showProductsBuyCartStatusOrder = data => {
        if (data.length > 0) {
            return (
                data.map((itemcart, index) => (itemcart.status_order) === false && (
                    <div className="cart-item-history" key={index}>
                        {
                            itemcart.cart.map((product, index) => (
                                <CartItem data={product} key={index} />
                            ))
                        }
                        <div className="group-info-buy-cart">
                            <CartInforBuy
                                token={token}
                                updataCartStatusOrderAPI={updataCartStatusOrderAPI}
                                data={itemcart}
                                id_card={itemcart._id
                                }
                            />

                        </div>
                    </div>
                ))
            )
        } else return (
            <div className="group-nofuound">
                <Empty />
            </div>

        )
    };

    return (
        <div className="group-history-cart">
            <div className="container-history-cart">
                <h3>LỊCH SỬ MUA HÀNG</h3>
                <Tabs defaultActiveKey="1"  >
                    <TabPane
                        tab="Tất Cả"
                        key="1"
                    >
                        {showProductsBuyCartAll(dataHistoryCart)}
                    </TabPane>
                    <TabPane
                        tab="Chờ Duyệt"
                        key="2"
                    >
                        {showProductsBuyCartAllPending(dataHistoryCart)}
                    </TabPane>
                    <TabPane
                        tab="Đã Xét Duyệt"
                        key="3"
                    >
                        {showProductsBuyCartAllFinish(dataHistoryCart)}
                    </TabPane>
                    <TabPane
                        tab="Đã Hủy"
                        key="4"
                    >
                        {showProductsBuyCartStatusOrder(dataHistoryCart)}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}