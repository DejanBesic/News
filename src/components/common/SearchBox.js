import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Colors from 'Utils/colors';

const Input = styled.TextInput`
  border: 1px solid ${Colors.black};
  margin: 5px;
  border-radius: 15px;
  padding-left: 40px;
`;

const Container = styled.View`
  position: relative;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const SearchBox = ({ onChangeText, value }) => {
  return (
    <Container>
      <StyledIcon name="search" size={20} color={Colors.black} />
      <Input onChangeText={(text) => onChangeText(text)} value={value} />
    </Container>
  );
};

const { func, string } = PropTypes;
SearchBox.propTypes = {
  onChangeText: func.isRequired,
  value: string.isRequired,
};

export default SearchBox;
