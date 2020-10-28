import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ArticleThumbnail, CarouselWithPagination } from 'Components';
import { screenKeys } from 'Actions/navigation';
import { ActivityIndicator } from 'react-native';
import Colors from 'Utils/colors';
import {
  getTopNewsForCategory,
  selectTopArticlesByCategory,
} from 'Actions/categories';

const Container = styled.View`
  padding: 15px 0;
`;

const List = styled.FlatList``;

const ListItemWrapper = styled.View`
  margin: 10px 0 0;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const TopCategoryNews = ({
  categories,
  fetchTopNewsForCategory,
  country,
  navigation,
}) => {
  useEffect(() => {
    categories.forEach((category) => {
      fetchTopNewsForCategory(1, 20, category.name, false);
    });
  }, [country]);

  const handleArticlePress = (id) => {
    navigation.navigate(screenKeys.article, { id, isCategory: true });
  };

  const handleCategoryPress = (categoryName) => {
    navigation.navigate(screenKeys.category, { categoryName });
  };

  const renderArticleThumbnail = ({ item }) => {
    const { id, title, description, urlToImage } = item || {};
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

  const renderVerticalList = ({ item }) => {
    const { name, articles, isLoading, isTitle } = item || {};
    if (isLoading) return <ActivityIndicator color={Colors.curiousBlue} />;
    if (isTitle) {
      return <Title>{`Top 5 news by categories from ${country}:`}</Title>;
    }
    return (
      <CarouselWithPagination
        title={name}
        data={articles}
        component={renderArticleThumbnail}
        onTitlePress={() => handleCategoryPress(name)}
      />
    );
  };

  return (
    <Container>
      <List
        renderItem={renderVerticalList}
        data={[{ isTitle: true, name: 'title' }, ...categories]}
        keyExtractor={(item) => item.name}
      />
    </Container>
  );
};

const { func, bool, arrayOf, shape, string } = PropTypes;
TopCategoryNews.propTypes = {
  categories: arrayOf(
    shape({
      name: string,
      isLoading: bool,
      errorMessage: string,
      articles: arrayOf(
        shape({
          title: string,
          description: string,
          urlToImage: string,
        })
      ),
    })
  ).isRequired,
  fetchTopNewsForCategory: func.isRequired,
  country: string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

TopCategoryNews.defaultProps = {};

const mapState = ({ categories, country }) => ({
  categories: selectTopArticlesByCategory(categories, 5),
  country: country.country,
});

const mapDispatch = (dispatch) => ({
  fetchTopNewsForCategory: (page, pageSize, category, isLoadingMore) =>
    dispatch(getTopNewsForCategory(page, pageSize, category, isLoadingMore)),
});

export default connect(mapState, mapDispatch)(TopCategoryNews);
