import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  index: 0,
  score: 0
};

const handleStart = (state, action) => {
  return updateObject(state, {
    index: action.data.index,
    score: action.data.score
  });
};

const handleValidate = (state, action) => {
  return updateObject(state, {
    score: action.data.score
  });
};

const handleNext = (state, action) => {
  return updateObject(state, {
    index: action.data.index
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUIZ_HANDLE_START:
      return handleStart(state, action);
    case actionTypes.QUIZ_HANDLE_VALIDATE:
      return handleValidate(state, action);
    case actionTypes.QUIZ_HANDLE_NEXT:
      return handleNext(state, action);
    default:
      return state;
  }
};

export default reducer;
