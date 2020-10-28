import { fetchPagedNews } from 'Utils/api';
import { addIdsToListOfObjects } from 'Utils/id';

export const FETCH_TOP_NEWS_START = 'FETCH_TOP_NEWS_START';
export const fetchTopNewsStart = (payload) => ({
  payload,
  type: FETCH_TOP_NEWS_START,
});

export const FETCH_TOP_NEWS_SUCCESS = 'FETCH_TOP_NEWS_SUCCESS';
export const fetchTopNewsSuccess = (payload) => ({
  payload,
  type: FETCH_TOP_NEWS_SUCCESS,
});

export const FETCH_TOP_NEWS_FAILURE = 'FETCH_TOP_NEWS_FAILURE';
export const fetchTopNewsFailure = (payload) => ({
  payload,
  type: FETCH_TOP_NEWS_FAILURE,
});

export const getTopNews = (page, pageSize = 20, isLoadingMore = false) => (
  dispatch
) => {
  dispatch(fetchTopNewsStart(!isLoadingMore));
  fetchPagedNews({ page, pageSize, country: 'GB' })
    .then((res) => {
      if (!res || res.status !== 'ok') {
        return dispatch(fetchTopNewsFailure());
      }

      const payload = {
        articles: addIdsToListOfObjects(res.articles),
        latestPage: page,
      };
      return dispatch(fetchTopNewsSuccess(payload));
    })
    .catch((err) => dispatch(fetchTopNewsFailure(err)));
};

export const selectArticleById = ({ articles }, id) => {
  return articles && articles.find((article) => article.id === id);
};
