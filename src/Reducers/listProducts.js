import * as actionTypes from '../Constants/actionType';
const initialState = {
    data: [],
    lengthData: null
};
const listProducts = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIST_PRODUCTS: {
            return {
                ...state,
                data: action.product.data,
                lengthData: action.product.lengthProducts
            }
        }
        default: return state;
    }
};

export default listProducts;
