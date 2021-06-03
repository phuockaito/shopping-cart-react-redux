import * as actionTypes from '../Constants/actionType';
const initialState = {
    data: [],
    lengthData: null
};
const productsNSX = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_NSX: {
            return {
                ...state,
                data: action.NSX.data,
                lengthData: action.NSX.length
            }
        }
        default: return state;
    }
};

export default productsNSX;
