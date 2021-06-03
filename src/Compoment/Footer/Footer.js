import React from 'react';
import './Footer.css';
import cash from 'image/cash.jpg';
import installment from 'image/installment.jpg';
import internet_banking from 'image/internet_banking.jpg';
import jcb from 'image/jcb.jpg';
import mastercard from 'image/mastercard.jpg';
import visa from 'image/visa.jpg';
export default function Footer() {
    return (
        <>
            <div className="frames-group-footer">
                <div className="group-footer">
                    <div className="footer">
                        <div className="group-information-user">
                            <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                            <ul>
                                <li>Các câu hỏi thường gặp</li>
                                <li>Gửi yêu cầu hỗ trợ</li>
                                <li>Hướng dẫn đặt hàng</li>
                                <li>Phương thức vận chuyển</li>
                                <li>Chính sách đổi trả</li>
                                <li>Hướng dẫn mua trả góp</li>
                            </ul>
                        </div>
                        <div className="group-information-website">
                            <h3>VỀ SHOP</h3>
                            <ul>
                                <li>Giới thiệu</li>
                                <li>Tuyển Dụng</li>
                                <li>Chính sách bảo mật thanh toán</li>
                                <li>Chính sách bảo mật thông tin cá nhân</li>
                                <li>Chính sách giải quyết khiếu nại</li>
                                <li>Điều khoản sử dụng</li>
                            </ul>
                        </div>
                        <div className="group-payment">
                            <h3>PHƯƠNG THỨC THANH TOÁN</h3>
                            <ul>
                                <li><img src={cash} alt="cash" /></li>
                                <li><img src={installment} alt="installment" /></li>
                                <li><img src={internet_banking} alt="internet_banking" /></li>
                                <li><img src={jcb} alt="jcb" /></li>
                                <li><img src={mastercard} alt="mastercard" /></li>
                                <li><img src={visa} alt="visa" /></li>
                            </ul>
                        </div>
                        <div className="group-connect-us">
                            <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/PhuocKaito1410" target="_blank"><i className="fa fa-facebook" /></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/phuockaito" target="_blank"><i className="fa fa-twitter" /></a>
                                </li>
                                <li>
                                <a href="https://www.youtube.com/channel/UC-AkfAZivVZFBQTQPh7hx2w" target="_blank"><i className="fa fa-youtube-play" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};