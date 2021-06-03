import * as actionTypes from '../Constants/actionType';
const myState = {
    data:[],
    lengthData:null
};
const listProductsType = (state = myState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_TYPE: {
            return {
                ...state,
                data: action.key.data,
                lengthData: action.key.length
            };
        }
        default: return state;
    }
};

export default listProductsType;
