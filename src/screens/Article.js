import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { shape } from 'prop-types';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { articleSelector } from 'Actions/news';

const Container = styled.ScrollView`
  padding: 15px 10px;
  border-radius: 5px;
  flex: 1;
`;

const StyledImage = styled(FastImage)`
  height: 200px;
  margin: 5px 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
`;

const Description = styled.Text`
  font-size: 18px;
`;

const Article = (props) => {
  const { article } = props;
  const { title, urlToImage, content } = article || {};
  return (
    <Container>
      <Title>{title}</Title>
      <StyledImage
        source={{
          uri: urlToImage,
          priority: FastImage.priority.normal,
        }}
      />
      <Description>{content}</Description>
    </Container>
  );
};

const { string } = PropTypes;
Article.propTypes = {
  article: shape({
    title: string,
    urlToImage: string,
    content: string,
  }),
};

Article.defaultProps = {
  article: {},
};

const mapState = ({ topNews }, { route }) => {
  const { params } = route || {};
  const { id } = params || {};
  return {
    article: articleSelector(topNews, id),
  };
};

const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(Article);
