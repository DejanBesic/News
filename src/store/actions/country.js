export const SET_COUNTRY = 'SET_COUNTRY';

export const onSetCountry = (payload) => ({ payload, type: SET_COUNTRY });

export const setCountry = (country) => (dispatch) => {
  dispatch(onSetCountry(country));
};
