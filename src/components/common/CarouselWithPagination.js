import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes, { string } from 'prop-types';
import styled from 'styled-components/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
`;

const CarouselWithPagination = ({ component, data, title, onTitlePress }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <View>
      {title && (
        <TouchableOpacity onPress={onTitlePress}>
          <Title>{title}:</Title>
        </TouchableOpacity>
      )}
      <Carousel
        data={data}
        renderItem={component}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.9}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }}
      />
    </View>
  );
};

const { func, arrayOf, shape } = PropTypes;
CarouselWithPagination.propTypes = {
  component: func.isRequired,
  title: string.isRequired,
  data: arrayOf(
    shape({
      title: string,
      description: string,
    })
  ).isRequired,
  onTitlePress: func.isRequired,
};

export default CarouselWithPagination;
