import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import Colors from 'Utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TouchableIcon = ({ onPress, name, size, color }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);

const { func, number, string } = PropTypes;
TouchableIcon.propTypes = {
  onPress: func.isRequired,
  name: string.isRequired,
  size: number,
  color: string,
};

TouchableIcon.defaultProps = {
  size: 30,
  color: Colors.black,
};

export default TouchableIcon;
