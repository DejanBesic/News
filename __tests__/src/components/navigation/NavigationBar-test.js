import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationBar } from 'Components';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const MockedNavigator = ({ component, params = {} }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MockedScreen"
          component={component}
          initialParams={params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mockStore = configureStore([]);

describe('NavigationBar', () => {
  let store;
  let props;
  beforeEach(() => {
    jest.mock('@react-navigation/native', () => ({
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: {
          canGoBack: () => false,
        },
      }),
    }));

    props = {
      useHamburgerMenu: false,
    };

    store = mockStore({
      country: {
        country: 'GB',
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders without props', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MockedNavigator component={NavigationBar} />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders hamburger menu', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MockedNavigator component={() => <NavigationBar useHamburgerMenu />} />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders hamburger menu', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MockedNavigator component={NavigationBar} />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders back arrow and triggers country changes', () => {
    jest.mock('@react-navigation/native', () => ({
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: {
          canGoBack: () => true,
        },
      }),
    }));

    const component = renderer.create(
      <Provider store={store}>
        <MockedNavigator component={NavigationBar} />
      </Provider>
    );
    const countryButtons = component.root.findAllByType(TouchableOpacity);
    renderer.act(() => {
      countryButtons[0].props.onPress();
      countryButtons[1].props.onPress();
    });
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
