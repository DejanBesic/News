import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import styled from 'styled-components/native';
import { ArticleThumbnail } from 'Components';
import { getTopNews } from 'Actions/news';
import { screenKeys } from 'Actions/navigation';

const Container = styled.View``;

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

const TopNews = (props) => {
  const { fetchTopNews, isLoading, articles, navigation, latestPage } = props;

  useEffect(() => {
    fetchTopNews(1, 20);
  }, []);

  const handleArticlePress = (id) => {
    navigation.navigate(screenKeys.article, { id });
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
          onPress={() => handleArticlePress(id)}
        />
      </ListItemWrapper>
    );
  };

  return (
    <Container>
      <List
        renderItem={renderItem}
        data={[{ isTitle: true, id: 'title' }, ...articles]}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReached}
        refreshing={isLoading}
        onRefresh={onRefresh}
      />
    </Container>
  );
};

const { func, bool, arrayOf, shape, number } = PropTypes;
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  latestPage: number,
};

TopNews.defaultProps = {
  fetchTopNews: () => {},
  isLoading: false,
  articles: [],
  latestPage: 0,
};

const mapState = ({ topNews }) => ({
  isLoading: topNews.isLoading,
  articles: topNews.articles,
  latestPage: topNews.latestPage,
});

const mapDispatch = (dispatch) => ({
  fetchTopNews: (page, pageSize, isLoadingMore) =>
    dispatch(getTopNews(page, pageSize, isLoadingMore)),
});

export default connect(mapState, mapDispatch)(TopNews);
