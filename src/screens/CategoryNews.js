import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import styled from 'styled-components/native';
import { ArticleThumbnail } from 'Components';
import { screenKeys } from 'Actions/navigation';
import { getTopNewsForCategory } from 'Actions/categories';

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

const CategoryNews = ({
  fetchTopNewsForCategory,
  isLoading,
  articles,
  navigation,
  name,
  latestPage,
  country,
}) => {
  useEffect(() => {
    fetchTopNewsForCategory(1, 20, name, false);
  }, []);

  const handleArticlePress = (article) => {
    navigation.navigate(screenKeys.article, { ...article });
  };

  const onEndReached = () => {
    if (!articles) return;
    fetchTopNewsForCategory(latestPage + 1, 20, name, true);
  };

  const onRefresh = () => fetchTopNewsForCategory(1, 20, name, false);

  const renderItem = ({ item }) => {
    const { id, title, description, urlToImage, isTitle } = item || {};
    if (isTitle) {
      return <Title>{`Top ${name.toLowerCase()} news from ${country}`}</Title>;
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
CategoryNews.propTypes = {
  fetchTopNewsForCategory: func.isRequired,
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
  name: string.isRequired,
  country: string.isRequired,
};

CategoryNews.defaultProps = {
  isLoading: false,
  articles: [],
  latestPage: 0,
};

const mapState = ({ categories, country }, { route }) => {
  const { params } = route || {};
  const { categoryName } = params || {};
  const category =
    categories.categories.find((c) => c.name === categoryName) || {};
  return {
    ...category,
    country: country.country,
  };
};

const mapDispatch = (dispatch) => ({
  fetchTopNewsForCategory: (page, pageSize, category, isLoadingMore) =>
    dispatch(getTopNewsForCategory(page, pageSize, category, isLoadingMore)),
});

export default connect(mapState, mapDispatch)(CategoryNews);
