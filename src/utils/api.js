import queryString from 'query-string';
import { fetchPromise } from 'Utils/fetch';

// const API_KEY = '4c4277c99cb14b219ab5bd162750e5aa';
// const API_KEY = '3b75f7557a9e46e99cb54a1348bb7781';
const API_KEY = '095f5e653a944b3790c28eda736d0ae3';

export const fetchPagedNews = (params) => {
  const queryParams = {
    ...params,
  };
  const query = `${queryString.stringify(queryParams)}`;
  return fetchPromise(
    `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&${query}`
  );
};

export const asd = 'asd';
