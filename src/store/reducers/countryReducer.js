import { SET_COUNTRY } from '../actions/country';

export const initialState = {
  country: 'GB',
};

const newsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COUNTRY:
      return {
        ...state,
        country: payload,
      };

    default:
      return state;
  }
};

export default newsReducer;
