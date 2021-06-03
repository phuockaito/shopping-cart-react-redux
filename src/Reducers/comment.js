import * as actionTypes from '../Constants/actionType';
import { message } from 'antd';
const initialState = {
  data: [],
  lengthData: null,
  status: 'success'
}
const comment = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMMENT_PRODUCT: {

      return {
        ...state,
        data: action.comment.data,
        lengthData: action.comment.length
      }
    }
    case actionTypes.POST_COMMENT_PRODUCT: {
      const NewComment = [...state.data];
      NewComment.unshift(action.dataComment.data);
      console.log('action', action);
      return {
        ...state,
        data: NewComment,
        lengthData: action.dataComment.length
      }
    }

    case actionTypes.DELETE_COMMENT_PRODUCT: {
      const NewComment = [...state.data];
      const id = action.deleteComment.data._id;
      const index = NewComment.findIndex(comment => comment._id === id);
      NewComment.splice(index, 1);
      message.success('Xóa Thành Công', 1.5);
      return {
        ...state,
        data: NewComment,
        lengthData: action.deleteComment.length
      }
    }
    default: return { ...state };
  };
};
export default comment;