import { message, notification } from 'antd';
import * as actionTypes from 'Constants/actionType';
const initialState = JSON.parse(localStorage.getItem('cart')) || [];
const CardProducts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const { product, quantity } = action;
      const sizeCart = action.product.size;
      const fileIndex = (listProduct, size, id) => {
        var reslut = -1;
        listProduct.forEach((productCart, index) => {
          if (productCart.product.size === size && productCart.product._id === id) {
            reslut = index;
          }
        })
        return reslut;
      }
      const index = fileIndex(state, sizeCart, product._id);
      if (index !== -1) {
        state[index].quantity += quantity;
        message.success('Cập nhật Số Lượng Thành Công', 1.5);
      } else {
        state.unshift({
          product,
          quantity
        })
        message.success('Đã Thêm Vào Vỏ Hàng Thành Công', 1.5);
      }
      localStorage.setItem("cart", JSON.stringify(state));
      return [...state];
    };
    case actionTypes.DELETE_CART: {
      const { index, cart } = action.product;
      const cartOld = [...cart]
      const indexState = cartOld.findIndex((cart, indenCart) => indenCart === index);
      if (indexState !== -1) {
        cart.splice(indexState, 1);
      }
      message.success('Xóa Thành Công', 1.5);
      localStorage.setItem("cart", JSON.stringify(state));
      return [...state]
    };
    case actionTypes.UPDATA_CART: {
      const { index, quantity } = action;
      const indexState = state.findIndex((cart, indexCart) => indexCart === index);
      if (indexState !== -1) {
        state[indexState].quantity = quantity;
      }
      message.success('Cập Nhật Thành Công', 1.5);
      localStorage.setItem("cart", JSON.stringify(state));
      return [...state]
    };
    case actionTypes.ADD_CART_API: {
      notification['success']({
        message: 'Đặt Hành Thành Công !',
        description: 'Chi tiết trong lịch sử mua hàng'
      });
      localStorage.removeItem("cart");
      state = [];
      return [...state]
    }
    default: return [...state];
  }

};

export default CardProducts;