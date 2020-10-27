import { combineReducers } from 'redux';
import * as reduxStorage from 'redux-storage';
import topNews, { initialState as topNewsInitialState } from './topNewsReducer';
import country, { initialState as countryInitialState } from './countryReducer';

export const initialState = {
  topNews: topNewsInitialState,
  country: countryInitialState,
};

export const reducer = reduxStorage.reducer(
  combineReducers({
    topNews,
    country,
  })
);
