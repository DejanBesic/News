import queryString from 'query-string';

// const API_KEY = '4c4277c99cb14b219ab5bd162750e5aa';
const API_KEY = '3b75f7557a9e46e99cb54a1348bb7781';
export const fetchPagedNews = (params) => {
  const queryParams = {
    ...params,
  };
  const query = `${queryString.stringify(queryParams)}`;
  return fetch(
    `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&${query}`
  ).then((res) => res.json());
};

export const asd = 'asd';
