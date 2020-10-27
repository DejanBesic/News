import queryString from 'query-string';

const API_KEY = '4c4277c99cb14b219ab5bd162750e5aa';

export const fetchPagedNews = (page, pageSize) => {
  const queryParams = {
    page,
    pageSize,
  };
  const query = `${queryString.stringify(queryParams)}`;
  return fetch(
    `https://newsapi.org/v2/top-headlines?country=GB&apiKey=${API_KEY}&${query}`
  ).then((res) => res.json());
};

export const asd = 'asd';
