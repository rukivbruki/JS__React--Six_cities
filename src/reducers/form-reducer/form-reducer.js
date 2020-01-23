import {reducer} from "redux-form";
import {ActionType} from "../comments/comments";

const formReducer = reducer.plugin({
  reviewForm: (state, action) =>{
    switch (action.type) {
      case ActionType.COMMENT_SENDED:
        return Object.assign({}, state, {
          values: undefined,
        });
      default:
        return state;
    }
  }
});

export {formReducer};
