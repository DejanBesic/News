import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { onTest } from 'Actions/news';

const ComponentA = (props) => {
  const { test, handleTest } = props;
  if (test)
    return (
      <TouchableOpacity
        style={{ backgroundColor: 'red' }}
        onPress={() => handleTest(false)}
      >
        <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
      </TouchableOpacity>
    );
  return (
    <TouchableOpacity
      style={{ backgroundColor: 'red' }}
      onPress={() => handleTest(true)}
    >
      <Text>Component A</Text>
    </TouchableOpacity>
  );
};

const { bool, func } = PropTypes;
ComponentA.propTypes = {
  test: bool,
  handleTest: func,
};

ComponentA.defaultProps = {
  test: '',
  handleTest: () => {},
};

const mapState = ({ news }) => ({
  test: news.test,
});

const mapDispatch = (dispatch) => ({
  handleTest: (newValue) => dispatch(onTest(newValue)),
});

export default connect(mapState, mapDispatch)(ComponentA);
