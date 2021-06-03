import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
const formatter = new Intl.NumberFormat('vn');
export default function CartItem(props) {
    const { data } = props;
    return (
        <div className="group-card-buy" key={data.product._id}>
            <div className="information-cart-buy">
                <div className="group-cart-img-name">
                    <div className="history-cart-product-img">
                        <img src={data.product.poster} alt={data.product._id} />
                    </div>
                    <div className="history-card-name">
                        <Link
                            to={`/${data.product.key}/${data.product.NSX.replace(/ /g, '-')}/${data.product.name.replace(/ /g, '-')}/${data.product._id}`}
                            onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 800); }}
                        >
                            <p>{data.product.name} - <span>Size: {data.product.size}</span> </p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="group-card-price-quantity">
                <div className="group-card-price">
                    <span>Giá</span>
                    <p>{formatter.format(data.product.price)} <u>đ</u></p>
                </div>
                <div className="group-cart-quantity">
                    <span>Số Lượng</span>
                    <p>{data.quantity}</p>
                </div>
            </div>
        </div>

    )
}