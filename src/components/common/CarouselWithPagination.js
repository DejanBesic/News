import React, { useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import PropTypes, { string } from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  pagination: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

const CarouselWithPagination = ({ component, data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <View>
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
        dotStyle={styles.pagination}
      />
    </View>
  );
};

const { func, arrayOf, shape } = PropTypes;
CarouselWithPagination.propTypes = {
  component: func.isRequired,
  data: arrayOf(
    shape({
      title: string,
      description: string,
    })
  ).isRequired,
};

export default CarouselWithPagination;
