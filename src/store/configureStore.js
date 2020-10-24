import { createStore } from 'redux';
import * as storage from 'redux-storage';
import middleware from './middleware/index';
import { reducer } from './reducers/index';
import storageEngine from './storageEngine';

function configureStore() {
  const store = createStore(reducer, middleware);
  storage.createLoader(storageEngine)(store);
  return store;
}

export default configureStore;
