import { combineReducers } from 'redux';
import * as reduxStorage from 'redux-storage';
import news, { initialState as newsInitialState } from './newsReducer';

export const initialState = {
  news: newsInitialState,
};

export const reducer = reduxStorage.reducer(
  combineReducers({
    news,
  }),
);
