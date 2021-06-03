import { message } from 'antd';
import * as actionTypes from '../Constants/actionType';
const initialState = {
    token: null,
    user: []
};
const key = 'updatable';
const user = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_USER: {
            const { userRegister } = action;
            message.loading({ content: 'Đang xử lý...', key });
            setTimeout(() => {
                localStorage.setItem("token", userRegister.token);
                window.location.reload();
            }, 1000);
            return {
                ...state,
                user: userRegister.data,
                token: userRegister.token
            };

        };
        case actionTypes.LOGIN_USER: {
            const { userLogin } = action;
            const token = userLogin.accesToken;
            localStorage.setItem("token", token);
            window.location.reload();
            return {
                ...state,
                token: token
            };
        }
        case actionTypes.INFORMATION_USER: {
            const { data } = action.data;
            return {
                ...state,
                user: data
            };
        }
        case actionTypes.UPDATA_USER_INFO: {
            const { data } = action.data;
            return {
                ...state,
                user: data
            }
        }
        case actionTypes.UPLOAD_IMAGE_USER: {
            const data = action.data.user;
            return {
                ...state,
                user: data
            }
        }
        default: return { ...state };
    }
};

export default user;
