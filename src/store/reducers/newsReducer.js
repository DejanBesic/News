import { TEST } from '../actions/news';

export const initialState = {
  test: false,
};
const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        test: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer;
