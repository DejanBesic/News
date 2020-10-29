import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { screenKeys, navigationRef, getHeaderTitle } from 'Actions/navigation';
import {
  Article,
  TopNews,
  TopCategoryNews,
  CategoryNews,
  Search,
} from 'Screens';
import { NavigationBar } from 'Components';
import Colors from 'Utils/colors';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

// eslint-disable-next-line react/prop-types
const SideBar = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    // eslint-disable-next-line react/prop-types
    navigation.setOptions({
      headerTitle: (props) => (
        <NavigationBar
          useHamburgerMenu
          {...props}
          title={getHeaderTitle(route)}
        />
      ),
    });
  }, [navigation, route]);

  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: Colors.swirl,
        color: Colors.black,
      }}
      initialRouteName={screenKeys.topNews}
    >
      <Drawer.Screen name={screenKeys.topNews} component={TopNews} />
      <Drawer.Screen name={screenKeys.categories} component={TopCategoryNews} />
      <Drawer.Screen name={screenKeys.search} component={Search} />
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.swirl,
          },
          headerLeft: () => {},
          headerTitle: (props) => <NavigationBar {...props} />,
        }}
      >
        <RootStack.Screen name={screenKeys.topNews} component={SideBar} />
        <RootStack.Screen name={screenKeys.article} component={Article} />
        <RootStack.Screen name={screenKeys.category} component={CategoryNews} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
