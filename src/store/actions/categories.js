import { fetchPagedNews } from 'Utils/api';
import { addIdsToListOfObjects } from 'Utils/id';

export const FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START';
export const fetchCategoriesStart = (payload) => ({
  payload,
  type: FETCH_CATEGORIES_START,
});

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const fetchCategoriesSuccess = (payload) => ({
  payload,
  type: FETCH_CATEGORIES_SUCCESS,
});

export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const fetchCategoriesFailure = (payload) => ({
  payload,
  type: FETCH_CATEGORIES_FAILURE,
});

export const getTopNewsForCategory = (
  page,
  pageSize = 20,
  category,
  isLoadingMore = false
) => (dispatch, getState) => {
  dispatch(
    fetchCategoriesStart({ categoryName: category, isLoading: !isLoadingMore })
  );
  const { country } = getState();
  fetchPagedNews({ page, pageSize, category, country: country.country })
    .then((res) => {
      if (!res || res.status !== 'ok') {
        return dispatch(fetchCategoriesFailure());
      }

      const payload = {
        articles: addIdsToListOfObjects(res.articles),
        latestPage: page,
        categoryName: category,
      };
      return dispatch(fetchCategoriesSuccess(payload));
    })
    .catch(() => {
      const payload = {
        categoryName: category,
        isLoading: false,
        errorMessage: 'There are no results found in this section',
      };
      dispatch(fetchCategoriesFailure(payload));
    });
};

export const areCategoriesValid = (categories) =>
  categories && Array.isArray(categories);

export const selectTopArticlesByCategory = ({ categories }, numOfArticles) => {
  return (
    areCategoriesValid(categories) &&
    categories.map((category) => ({
      ...category,
      articles: [...category.articles.slice(0, numOfArticles)],
    }))
  );
};

export const selectArticleFromCategoryById = ({ categories }, id) => {
  const foundArticle =
    categories &&
    Array.isArray(categories) &&
    categories
      .map((category) => {
        return (
          category &&
          category.articles &&
          category.articles.find((article) => article.id === id)
        );
      })
      .filter((c) => c);

  if (!foundArticle) return {};

  return foundArticle[0];
};
