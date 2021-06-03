import * as actionTypes from '../Constants/actionType';
const myState = [];
const listSilder = (state = myState, action) => {
    switch (action.type) {
        case actionTypes.GET_SILDERS: {
            state = action.key.data;
            return state;
        }
        default: return state;
    }
};

export default listSilder;
