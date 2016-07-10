import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  Navigator,
  View
} from 'react-native';

class MainPage extends Component {
  constructor(props) {
    super(props);
    console.log('MainPage constructor called');
  }

  render() {
    return(
      <Text> Welcome here gentleman </Text>
    );
  }
}

AppRegistry.registerComponent('MainPage', () => MainPage);
module.exports = MainPage;
