import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { SearchBox, ArticleThumbnail, ErrorMessage } from 'Components';
import { getTopNews } from 'Actions/news';
import { screenKeys } from 'Actions/navigation';
import { fetchPagedNews } from 'Utils/api';
import { addIdsToListOfObjects } from 'Utils/id';
import { View } from 'react-native';

const List = styled.FlatList`
  padding: 15px;
`;

const ListItemWrapper = styled.View`
  margin: 10px 0;
`;

const error = 'Could not find any results for this search';

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
    setErrorMessage(null);
    fetchPagedNews(params)
      .then((res) => {
        setIsLoading(false);
        if (!res || res.status !== 'ok') {
          setErrorMessage(error);
          return;
        }
        setArticles(addIdsToListOfObjects(res.articles));
        if (!res.articles) {
          setErrorMessage(error);
        }
        setPage(1);
      })
      .catch(() => {
        setErrorMessage(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (searchInput) {
      onRefresh();
    }
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
    <View>
      <SearchBox value={searchInput} onChangeText={setSearchInput} />
      {errorMessage ? <ErrorMessage text={errorMessage} /> : null}
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
    </View>
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
