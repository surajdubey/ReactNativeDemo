/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Navigator
} from 'react-native';
import LoginPage from "./LoginPage";

class ReactNativeDemo extends Component {

  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{id: 'LoginPage', name: 'LoginPage'}}
        renderScene={this.renderScene.bind(this)}
       />
    );
  }

  renderScene(route, navigator) {
      var routeId = route.id;
      console.log('route id ' + routeId );
      if(routeId === 'LoginPage') {
        console.log('login page');
        return (<LoginPage navigator={navigator}/>);
      }
      if(routeId === 'MainPage') {
        console.log('Navigating to Main Page');
        return (<MainPage navigator={navigator}/>);
      }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);
