import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toggleSideBar } from 'Actions/navigation';
import { setCountry } from 'Actions/country';
import Colors from 'Utils/colors';
import TouchableIcon from '../common/TouchableIcon';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Country = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ country, name }) =>
    (country === name && Colors.black) || Colors.white};
`;

const CountryButton = styled(TouchableOpacity)`
  padding: 5px;
`;

const NavigationBar = (props) => {
  const { useHamburgerMenu, children, onCountryChange, country } = props;
  const navigation = useNavigation();
  const useBackArrow = navigation.canGoBack();

  return (
    <Container>
      {useHamburgerMenu && !useBackArrow && (
        <TouchableIcon name="menu" onPress={() => toggleSideBar(navigation)} />
      )}
      {useBackArrow && (
        <TouchableIcon name="arrow-left" onPress={() => navigation.goBack()} />
      )}
      <Wrapper>
        <Title isUsingIcon={useHamburgerMenu || useBackArrow}>{children}</Title>
      </Wrapper>
      <Wrapper>
        <CountryButton onPress={() => onCountryChange('GB')}>
          <Country name="GB" country={country}>
            GB
          </Country>
        </CountryButton>
        <CountryButton onPress={() => onCountryChange('US')}>
          <Country name="US" country={country}>
            US
          </Country>
        </CountryButton>
      </Wrapper>
    </Container>
  );
};

const { string, bool, func } = PropTypes;
NavigationBar.propTypes = {
  useHamburgerMenu: bool,
  children: string,
  onCountryChange: func.isRequired,
  country: string.isRequired,
};

NavigationBar.defaultProps = {
  useHamburgerMenu: false,
  children: '',
};

const mapState = ({ country }) => ({
  country: country.country,
});

const mapDispatch = (dispatch) => ({
  onCountryChange: (country) => dispatch(setCountry(country)),
});

export default connect(mapState, mapDispatch)(NavigationBar);
