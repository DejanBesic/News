import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentA, ComponentB } from 'Components';
import configureStore from './src/store/configureStore';

const store = configureStore();
let RootStack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="componentA" component={ComponentA} />
          <RootStack.Screen name="componentB" component={ComponentB} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
