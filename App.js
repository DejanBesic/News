import React from 'react';
import { Provider } from 'react-redux';
import Navigator from './src/Navigator';
import configureStore from './src/store/configureStore';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
