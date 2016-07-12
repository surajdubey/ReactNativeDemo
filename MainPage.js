import React, {Component} from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Text,
  Navigator,
  View,
  ListView
} from 'react-native';
import UserDataListView from './UserDataListView';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {accessToken: ''};
    console.log('MainPage constructor called');
  }

  render() {

    AsyncStorage.getItem("accessToken").then(
      (accessToken) => {
        this.setState({accessToken: accessToken});
      }
    );
    return(
      <View>
        <Text> Welcome here {this.state.accessToken} </Text>
        <UserDataListView />
      </View>
    );
  }
}

AppRegistry.registerComponent('MainPage', () => MainPage);
module.exports = MainPage;
