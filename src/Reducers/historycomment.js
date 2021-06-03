import * as actionTypes from 'Constants/actionType';
const initialState = {
  data: [],
  lengthData: null
};
const historycomment = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HISTORY_COMMENT: {
      return {
        ...state,
        data: action.comment.data,
        lengthData: action.comment.length
      }
    };
    case actionTypes.DELETE_COMMENT_PRODUCT: {
      const NewComment = [...state.data];
      let lengthDataOld = state.lengthData;
      const id = action.deleteComment.data._id;
      const index = NewComment.findIndex(comment => comment._id === id);
      NewComment.splice(index, 1);
      return {
        ...state,
        data: NewComment,
        lengthData: lengthDataOld - 1
      }
    }
    default: return { ...state };
  }
};
export default historycomment;

