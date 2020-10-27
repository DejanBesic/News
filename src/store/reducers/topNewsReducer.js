import {
  FETCH_TOP_NEWS_START,
  FETCH_TOP_NEWS_SUCCESS,
  FETCH_TOP_NEWS_FAILURE,
} from '../actions/news';

export const initialState = {
  isLoading: false,
  latestPage: 1,
  articles: [],
  errorMessage: '',
};

const newsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TOP_NEWS_START:
      return {
        ...state,
        isLoading: payload,
        errorMessage: '',
      };

    case FETCH_TOP_NEWS_SUCCESS: {
      const previousArticles = payload.latestPage > 1 ? state.articles : [];
      return {
        ...state,
        isLoading: false,
        articles: [...previousArticles, ...payload.articles],
        latestPage: payload.latestPage,
      };
    }
    case FETCH_TOP_NEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default newsReducer;
