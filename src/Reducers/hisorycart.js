import * as actionTypes from '../Constants/actionType';
import { notification } from 'antd';
const initialState = [];
const historyCart = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HISTORY_CART: {
            state = action.cart.data;
            return state;
        };

        case actionTypes.UPDATA_CART_ADDRESS: {
            const cardOld = [...state];
            const id = action.data_uptata.data[0]._id;
            const cardReq = action.data_uptata.data[0];
            const index = cardOld.findIndex(card => card._id === id);
            cardOld[index] = cardReq;
            notification['success']({
                message: 'Cập Nhật Thành',
                description: 'Thông tin chi tiết trong đơn hàng'
            });
            return [...cardOld];
        };

        case actionTypes.UPDATA_CART_STATUS_CARD: {
            const cardOld = [...state];
            const id = action.data_order_status.data[0]._id;
            const cardReq = action.data_order_status.data[0];
            const index = cardOld.findIndex(card => card._id === id);
            cardOld[index] = cardReq;
            notification['success']({
                message: 'Thao tác Thành công',
                description: 'Thông tin chi tiết trong lịch sử mua hàng'
            });
            return [...cardOld];
        }
        default: return [...state];
    }
};
export default historyCart;