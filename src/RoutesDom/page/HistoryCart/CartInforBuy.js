import React, { useEffect, useState } from 'react';
import { Drawer, Button, Modal } from 'antd';
import $ from 'jquery';
import moment from 'moment';
import EditAddress from './EditAddress';
import {
    EditOutlined,
    FileSearchOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
    CloseOutlined,
    DeleteOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
const formatter = new Intl.NumberFormat('vn');
export default function CartInforBuy({ id_card, data, token, updataCartStatusOrderAPI }) {
    const [visible, setVisible] = useState(false);
    const [visibleEditAddress, setVisibleEditAddress] = useState(false);
    useEffect(() => {
        visible ? $('body').addClass('active') : $('body').removeClass('active');
        visibleEditAddress ? $('body').addClass('active') : $('body').removeClass('active');
    }, [visible, visibleEditAddress]);
    const CancelOrder = (id_card) => {
        const data = {
            data_card: {
                status_order: false,
            },
            token: token,
            id_card: id_card
        }
        updataCartStatusOrderAPI(data);
    }
    const OrderCall = (id_card) => {
        const data = {
            data_card: {
                status_order: true,
            },
            token: token,
            id_card: id_card
        }
        updataCartStatusOrderAPI(data);
    }
    return (
        <>

            <div className="group-sum-totale">
                <h5>Tổng Số Tiền<p>{formatter.format(data.totalSum)} <u>đ</u></p></h5>
            </div>

            <div className="button-more-info">
                {
                    !data.status_order ? (
                        <Button
                            type="primary"
                            className="btn-cancel-order-call"
                            onClick={() => OrderCall(id_card)}
                        >
                            <ShoppingCartOutlined /> Đặt hàng lại
                        </Button>
                    ) : null
                }
                {
                    data.status_order ? (<Button
                        type="primary"
                        className="btn-cancel-order"
                        onClick={() => CancelOrder(id_card)}
                    >
                        <CloseOutlined /> Hủy đơn hàng
                    </Button>) : (
                            <Button
                                disabled
                                type="primary"
                                className="btn-cancel-order-uy"
                            >
                                <DeleteOutlined />   Đơn hàng đã hủy
                            </Button>
                        )
                }
                {
                    data.status_order ? (
                        <Button
                            type="primary"
                            className="btn-edit-address"
                            onClick={() => setVisibleEditAddress(true)}
                        >
                            <EditOutlined />
                    Chỉnh sửa
                        </Button>
                    ) : null
                }
                <Button
                    disabled
                    className={`${data.success ? 'true' : 'false'}`}
                >
                    {
                        data.success ? <CheckCircleOutlined /> : <LoadingOutlined />
                    }
                    Trạng Thái: {data.success ? 'Đã xét duyệt' : 'Chờ xét duyệt'}
                </Button>
                <Button
                    type="primary"
                    onClick={() => setVisible(true)}
                    className="show-button-more-info"
                >
                    <FileSearchOutlined />
                    Xem chi tiết đơn hàng
                </Button>

            </div>

            <Drawer
                title="Chi tiết Đơn Hàng"
                className="group-drawer-buy-cart"
                width={500}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{ padding: 10 }}
                className="container-information"
                placement="bottom"
            >
                <div className="group-modal-cart">
                    <div className="group-address-modal">
                        <span>Địa Chỉ:</span> <p>{data.address}</p>
                    </div>
                    <div className="group-phone-modal">
                        <span>Số Điện Thoại:</span> <p>{data.phone}</p>
                    </div>
                    <div className="group-payment-modal">
                        <span>Thanh Toán:</span> <p>{data.payment}</p>
                    </div>
                    <div className="group-time-modal">
                        <span>Ngày Đặt Hàng:</span>
                        <p>
                            {moment(data.timeCart).fromNow()}
                        </p>
                        <p> {moment(data.timeCart).subtract(1, 'days').format('h:mm:ss, DD/MM/YYYY')}</p>
                    </div>
                </div>
            </Drawer>

            <Modal
                title="Chỉnh sửa giao hàng"
                onClose={() => setVisibleEditAddress(false)}
                visible={visibleEditAddress}
                centered
                onCancel={() => setVisibleEditAddress(false)}
                footer={null}
            >
                <EditAddress id_card={id_card} />
            </Modal>
        </>
    )
}