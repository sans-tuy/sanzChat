import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Router from './src/config/router';
import {Provider} from 'react-redux';
import {store} from './src/config/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
