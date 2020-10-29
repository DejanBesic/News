import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

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

const Article = ({ title, urlToImage, content }) => (
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

const { string } = PropTypes;
Article.propTypes = {
  title: string,
  urlToImage: string,
  content: string,
};

Article.defaultProps = {
  title: '',
  urlToImage: '',
  content: '',
};

const mapState = (state, { route }) => {
  const { params } = route || {};
  const { title, urlToImage, content } = params || {};
  return {
    title,
    urlToImage,
    content,
  };
};

const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(Article);
