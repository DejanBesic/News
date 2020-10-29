import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Text = styled.Text`
  margin: 30px;
  font-size: 17px;
  color: red;
`;

const ErrorMessage = ({ text }) => <Text>{text}</Text>;

const { string } = PropTypes;
ErrorMessage.propTypes = {
  text: string.isRequired,
};

export default ErrorMessage;
