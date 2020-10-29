import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { SearchBox, ArticleThumbnail } from 'Components';
import { getTopNews } from 'Actions/news';
import { screenKeys } from 'Actions/navigation';
import { fetchPagedNews } from 'Utils/api';
import { addIdsToListOfObjects } from 'Utils/id';

const Container = styled.View``;

const List = styled.FlatList`
  padding: 15px;
`;

const ListItemWrapper = styled.View`
  margin: 10px 0;
`;

const ErrorMessage = styled.Text`
  color: red;
  margin: 30px;
`;

const TopNews = ({ country, navigation }) => {
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleArticlePress = (article) => {
    navigation.navigate(screenKeys.article, { ...article });
  };

  const onEndReached = () => {
    const params = {
      q: searchInput,
      country,
      pageSize: 20,
      page: page + 1,
    };

    setPage(page + 1);
    setIsLoading(true);
    setErrorMessage(null);
    fetchPagedNews(params)
      .then((res) => {
        setIsLoading(false);
        if (!res || res.status !== 'ok') {
          setErrorMessage('Could not find any results for this search');
          return;
        }
        setArticles([...articles, ...addIdsToListOfObjects(res.articles)]);
        setPage(1);
      })
      .catch(() => {
        setErrorMessage('Could not find any results for this search');
        setIsLoading(false);
      });
  };

  const onRefresh = () => {
    const params = {
      q: searchInput,
      country,
      pageSize: 20,
      page: 1,
    };
    setIsLoading(true);
    setErrorMessage('');
    fetchPagedNews(params)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (!res || res.status !== 'ok') {
          setErrorMessage('Could not find any results for this search');
          return;
        }
        setArticles(addIdsToListOfObjects(res.articles));
        if (!res.articles) {
          setErrorMessage('Could not find any results for this search');
        }
        setPage(1);
      })
      .catch(() => {
        setErrorMessage('Could not find any results for this search');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onRefresh();
  }, [searchInput]);

  const renderItem = ({ item }) => {
    const { id, title, description, urlToImage } = item || {};
    return (
      <ListItemWrapper>
        <ArticleThumbnail
          id={id}
          title={title}
          description={description}
          urlToImage={urlToImage}
          onPress={() => handleArticlePress(item)}
        />
      </ListItemWrapper>
    );
  };

  return (
    <Container>
      <SearchBox value={searchInput} onChangeText={setSearchInput} />
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      {!errorMessage && articles && articles.length > 0 && (
        <List
          renderItem={renderItem}
          data={articles}
          keyExtractor={(item) => item.id}
          onEndReached={onEndReached}
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
      )}
    </Container>
  );
};

const { string } = PropTypes;
TopNews.propTypes = {
  country: string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

TopNews.defaultProps = {
  country: '',
};

const mapState = ({ country }) => ({
  country: country.country,
});

const mapDispatch = (dispatch) => ({
  fetchTopNews: (page, pageSize, isLoadingMore) =>
    dispatch(getTopNews(page, pageSize, isLoadingMore)),
});

export default connect(mapState, mapDispatch)(TopNews);
