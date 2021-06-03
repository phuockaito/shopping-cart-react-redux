import * as actionTypes from '../Constants/actionType';
const myState = [];
const listMenu = (state = myState, action) => {
    switch (action.type) {
        case actionTypes.GET_MENU: {
            state = action.menu.data;
            return state;
        }
        default: return state;
    }
};

export default listMenu;
