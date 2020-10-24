import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage';
import logger from 'redux-logger';
import storageEngine from '../storageEngine';

const middleware = [thunk, storage.createMiddleware(storageEngine)];

// eslint-disable-next-line no-undef
if (__DEV__) {
  middleware.push(logger);
}

export default applyMiddleware(...middleware);
