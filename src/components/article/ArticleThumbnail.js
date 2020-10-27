import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colors from 'Utils/colors';

const Container = styled(TouchableWithoutFeedback)`
  background-color: ${Colors.swirl07};
  padding: 15px 10px;
  border-radius: 5px;
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

const More = styled.Text`
  color: ${Colors.curiousBlue};
  font-size: 15px;
`;

const ButtonWrapper = styled.View`
  display: flex;
  align-items: flex-end;
`;

const ArticleThumbnail = (props) => {
  const { title, urlToImage, description, onPress } = props;

  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
      <StyledImage
        source={{
          uri: urlToImage,
          priority: FastImage.priority.normal,
        }}
      />
      <Description>{description}</Description>
      <ButtonWrapper>
        <More>{'More >'}</More>
      </ButtonWrapper>
    </Container>
  );
};

const { string, func } = PropTypes;
ArticleThumbnail.propTypes = {
  title: string,
  urlToImage: string,
  description: string,
  onPress: func.isRequired,
};

ArticleThumbnail.defaultProps = {
  title: '',
  urlToImage: '',
  description: '',
};

export default ArticleThumbnail;
