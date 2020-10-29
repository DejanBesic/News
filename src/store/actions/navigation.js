import * as React from 'react';
import {
  DrawerActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {} from '@react-navigation/native';

export const navigationRef = React.createRef();

export const screenKeys = {
  article: 'Article',
  categories: 'Categories',
  category: 'Category',
  search: 'Search',
  topNews: 'Top News',
};

export const getHeaderTitle = (route) => {
  return getFocusedRouteNameFromRoute(route) ?? 'Top News';
};

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export const toggleSideBar = (navigation) => {
  navigation.dispatch(DrawerActions.toggleDrawer());
};

export const openSideBar = (navigation) => {
  navigation.dispatch(DrawerActions.openDrawer());
};

export const closeSideBar = (navigation) => {
  navigation.dispatch(DrawerActions.closeDrawer());
};
