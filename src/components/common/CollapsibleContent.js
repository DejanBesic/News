import React from 'react';
import PropTypes, { string } from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from 'Utils/colors';
import TouchableIcon from './TouchableIcon';

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.curiousBlue};
  text-decoration: underline;
`;

const CollapsibleWrapper = styled.View`
  background-color: ${Colors.swirl07};
  margin: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
`;

const CarouselWithPagination = ({
  children,
  onTitlePress,
  title,
  isExpanded,
  setIsExpanded,
}) => (
  <View>
    <CollapsibleWrapper>
      <TouchableOpacity onPress={onTitlePress}>
        <Title>{title}:</Title>
      </TouchableOpacity>
      <TouchableIcon
        size={25}
        name={isExpanded ? 'minus' : 'plus'}
        onPress={setIsExpanded}
      />
    </CollapsibleWrapper>

    {isExpanded ? children : null}
  </View>
);

const { func, bool, element } = PropTypes;
CarouselWithPagination.propTypes = {
  children: element.isRequired,
  title: string.isRequired,
  onTitlePress: func.isRequired,
  isExpanded: bool,
  setIsExpanded: func.isRequired,
};

CarouselWithPagination.defaultProps = {
  isExpanded: false,
};

export default CarouselWithPagination;
