import * as actionTypes from '../Constants/actionType';
const initialState = {
    data: [],
    lengthData: null
};
const search = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_PRODUCT: {
            return {
                ...state,
                data: action.keyword.data,
                lengthData: action.keyword.lengthProducts
            }
        }
        default: return state;
    }
};

export default search;
