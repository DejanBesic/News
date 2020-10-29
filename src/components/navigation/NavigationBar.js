import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { screenKeys, toggleSideBar } from 'Actions/navigation';
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
  color: ${({ selected }) => (selected && Colors.black) || Colors.white};
`;

const CountryButton = styled(TouchableOpacity)`
  padding: 5px;
`;

const NavigationBar = ({
  useHamburgerMenu,
  onCountryChange,
  country,
  title,
  children,
}) => {
  const navigation = useNavigation();
  const useBackArrow = navigation.canGoBack();
  const titleName = title || children;
  const isCountryDisabled =
    titleName === screenKeys.topNews || titleName === screenKeys.article;
  return (
    <Container>
      {useHamburgerMenu && !useBackArrow && (
        <TouchableIcon name="menu" onPress={() => toggleSideBar(navigation)} />
      )}
      {useBackArrow && (
        <TouchableIcon name="arrow-left" onPress={() => navigation.goBack()} />
      )}
      <Wrapper>
        <Title isUsingIcon={useHamburgerMenu || useBackArrow}>
          {title || children}
        </Title>
      </Wrapper>
      <Wrapper>
        <CountryButton
          disabled={isCountryDisabled}
          onPress={() => onCountryChange('GB')}
        >
          <Country name="GB" selected={country === 'GB'}>
            GB
          </Country>
        </CountryButton>
        <CountryButton
          disabled={isCountryDisabled}
          onPress={() => onCountryChange('US')}
        >
          <Country name="US" selected={country === 'US'}>
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
  title: string,
  onCountryChange: func.isRequired,
  country: string.isRequired,
  children: string,
};

NavigationBar.defaultProps = {
  useHamburgerMenu: false,
  title: null,
  children: null,
};

const mapState = ({ country }) => ({
  country: country.country,
});

const mapDispatch = (dispatch) => ({
  onCountryChange: (country) => dispatch(setCountry(country)),
});

export default connect(mapState, mapDispatch)(NavigationBar);
