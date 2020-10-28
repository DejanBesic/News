import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { screenKeys, navigationRef } from 'Actions/navigation';
import { Article, TopNews, TopCategoryNews, CategoryNews } from 'Screens';
import { NavigationBar } from 'Components';
import Colors from 'Utils/colors';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const SideBar = () => (
  <Drawer.Navigator initialRouteName={screenKeys.topNews}>
    <Drawer.Screen name={screenKeys.topNews} component={TopNews} />
    <Drawer.Screen name={screenKeys.categories} component={TopCategoryNews} />
    <Drawer.Screen name={screenKeys.search} component={TopNews} />
  </Drawer.Navigator>
);

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
        <RootStack.Screen
          name={screenKeys.topNews}
          component={SideBar}
          options={{
            headerTitle: (props) => (
              <NavigationBar useHamburgerMenu {...props} />
            ),
          }}
        />
        <RootStack.Screen
          name={screenKeys.article}
          component={Article}
          screenOptions={{
            headerTitle: (props) => <NavigationBar {...props} />,
          }}
        />

        <RootStack.Screen
          name={screenKeys.category}
          component={CategoryNews}
          screenOptions={{
            headerTitle: (props) => <NavigationBar {...props} />,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
