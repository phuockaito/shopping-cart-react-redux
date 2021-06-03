import * as actionTypes from '../Constants/actionType';
const myState = [];
const products_ID = (state = myState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_ID: {
            state = action.id.data;
            return [...state];
        }
        default: return state;
    }
};

export default products_ID;
