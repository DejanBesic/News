import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions/categories';

export const initialState = {
  categories: [
    {
      name: 'Business',
      isLoading: false,
      errorMessage: null,
      articles: [],
    },
    {
      name: 'Entertainment',
      isLoading: false,
      errorMessage: null,
      articles: [],
    },
    {
      name: 'General',
      isLoading: false,
      errorMessage: null,
      articles: [],
    },
    {
      name: 'Health',
      isLoading: false,
      errorMessage: null,
      articles: [],
    },
    {
      name: 'Science',
      isLoading: false,
      errorMessage: null,
      articles: [],
    },
    {
      name: 'Sports',
      isLoading: false,
      errorMessage: null,
      articles: [],
    },
    {
      name: 'Technology',
      isLoading: false,
      errorMessage: null,
      articles: [],
    },
  ],
};

const refreshStateWithNewArticles = (
  state,
  { articles, categoryName, latestPage }
) => {
  const categories = [...state.categories];

  return categories.map((category) => {
    if (category.name !== categoryName) {
      return { ...category };
    }

    const previousArticles = latestPage > 1 ? category.articles : [];
    return {
      ...category,
      isLoading: false,
      articles: [...previousArticles, ...articles],
      latestPage,
    };
  });
};
const updateStateOnStart = (state, { categoryName, isLoading }) => {
  const categories = [...state.categories];
  return categories.map((category) => {
    if (category.name !== categoryName) {
      return { ...category };
    }

    return {
      ...category,
      isLoading,
    };
  });
};

const newsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES_START:
      return {
        ...state,
        categories: updateStateOnStart(state, payload),
      };

    case FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: refreshStateWithNewArticles(state, payload),
      };
    }
    case FETCH_CATEGORIES_FAILURE:
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
