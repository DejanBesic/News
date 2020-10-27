import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export const screenKeys = {
  article: 'Article',
  topNews: 'Top News',
  categories: 'Categories',
  search: 'Search',
};

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export const goBack = () => {
  navigationRef.current?.goBack();
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
