import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ArticleThumbnail, ErrorMessage } from 'Components';
import { getTopNews } from 'Actions/news';
import { screenKeys } from 'Actions/navigation';

const List = styled.FlatList`
  padding: 15px;
`;

const ListItemWrapper = styled.View`
  margin: 10px 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const TopNews = ({
  fetchTopNews,
  isLoading,
  articles,
  navigation,
  latestPage,
  errorMessage,
}) => {
  useEffect(() => {
    fetchTopNews(1, 20);
  }, []);

  const handleArticlePress = (article) => {
    navigation.navigate(screenKeys.article, { ...article });
  };

  const onEndReached = () => {
    if (!articles) return;
    fetchTopNews(latestPage + 1, 20, true);
  };

  const onRefresh = () => fetchTopNews(1, 20);

  const renderItem = ({ item }) => {
    const { id, title, description, urlToImage, isTitle } = item || {};
    if (isTitle) {
      return <Title>Top news from Great Britain:</Title>;
    }

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

  if (errorMessage) {
    return <ErrorMessage text={errorMessage} />;
  }

  return (
    <List
      renderItem={renderItem}
      data={[{ isTitle: true, id: 'title' }, ...articles]}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      refreshing={isLoading}
      onRefresh={onRefresh}
    />
  );
};

const { func, bool, arrayOf, shape, number, string } = PropTypes;
TopNews.propTypes = {
  fetchTopNews: func,
  isLoading: bool,
  articles: arrayOf(
    shape({
      title: string,
      description: string,
      urlToImage: string,
    })
  ),
  navigation: shape({
    navigate: func.isRequired,
  }).isRequired,
  latestPage: number,
  errorMessage: string,
};

TopNews.defaultProps = {
  fetchTopNews: () => {},
  isLoading: false,
  articles: [],
  latestPage: 0,
  errorMessage: null,
};

const mapState = ({ topNews }) => ({
  isLoading: topNews.isLoading,
  articles: topNews.articles,
  latestPage: topNews.latestPage,
  errorMessage: topNews.errorMessage,
});

const mapDispatch = (dispatch) => ({
  fetchTopNews: (page, pageSize, isLoadingMore) =>
    dispatch(getTopNews(page, pageSize, isLoadingMore)),
});

export default connect(mapState, mapDispatch)(TopNews);
