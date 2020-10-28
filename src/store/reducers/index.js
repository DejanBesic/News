import { combineReducers } from 'redux';
import * as reduxStorage from 'redux-storage';
import topNews, { initialState as topNewsInitialState } from './topNewsReducer';
import country, { initialState as countryInitialState } from './countryReducer';
import categories, {
  initialState as categoriesInitialState,
} from './categoriesReducer';

export const initialState = {
  topNews: topNewsInitialState,
  country: countryInitialState,
  categories: categoriesInitialState,
};

export const reducer = reduxStorage.reducer(
  combineReducers({
    categories,
    country,
    topNews,
  })
);
