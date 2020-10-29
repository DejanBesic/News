import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  ArticleThumbnail,
  CarouselWithPagination,
  CollapsableContent,
  ErrorMessage,
} from 'Components';
import { screenKeys } from 'Actions/navigation';
import Colors from 'Utils/colors';
import {
  getTopNewsForCategory,
  selectTopArticlesByCategory,
} from 'Actions/categories';

const Container = styled.View`
  padding: 15px 0;
`;

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
  const [expandedCategory, setExapandedCategory] = useState('');

  const onRefresh = () => {
    fetchTopNewsForCategory(1, 20, expandedCategory, false);
  };

  useEffect(() => {
    onRefresh();
  }, [country, expandedCategory]);

  const handleArticlePress = (article) => {
    navigation.navigate(screenKeys.article, { ...article });
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
          onPress={() => handleArticlePress(item)}
        />
      </ListItemWrapper>
    );
  };

  const renderVerticalList = ({ item }) => {
    const { name, articles, isLoading, isTitle, errorMessage } = item || {};
    if (isTitle) {
      return <Title>{`Top 5 news by categories from ${country}:`}</Title>;
    }
    let content;

    if (isLoading) {
      content = <ActivityIndicator color={Colors.curiousBlue} size="large" />;
    } else if (errorMessage) {
      content = <ErrorMessage text={errorMessage} />;
    } else {
      content = (
        <CarouselWithPagination
          data={articles}
          component={renderArticleThumbnail}
        />
      );
    }
    const isExpanded = name === expandedCategory;
    return (
      <CollapsableContent
        onTitlePress={() => handleCategoryPress(name)}
        title={name}
        isExpanded={isExpanded}
        setIsExpanded={() => setExapandedCategory(isExpanded ? '' : name)}
      >
        {content}
      </CollapsableContent>
    );
  };

  return (
    <Container>
      <FlatList
        renderItem={renderVerticalList}
        data={[{ isTitle: true, name: 'title' }, ...categories]}
        keyExtractor={(item) => item.name}
        onRefresh={onRefresh}
        refreshing={false}
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
