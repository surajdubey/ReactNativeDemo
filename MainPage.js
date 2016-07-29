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
    return(
        <View>
            <Text> Welcome here {this.state.accessToken} </Text>
        </View>
    );
  }
}

function mapDispatchToProps(dispatch) {

}

AppRegistry.registerComponent('MainPage', () => MainPage);
module.exports = MainPage;
