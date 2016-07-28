import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Navigator
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import LoginPage from './LoginPage';
import MainPage from './MainPage';
import UserDataListView from './UserDataListView';

import rootReducer from './reducers';

const createStoreWithMiddleware = createStore(thunk)(createStore);

class ReactNativeDemo extends Component {

  render() {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <Navigator
               style={{ flex:1 }}
               initialRoute={{id: 'LoginPage', name: 'LoginPage'}}
               renderScene={this.renderScene}
           />
        </Provider>

    );
  }

  renderScene(route, navigator) {
      var routeName = route.name;
      if(routeName === 'LoginPage') {
        console.log('login page');
        return (<LoginPage navigator={navigator}/>);
      }

      if(routeName === 'MainPage') {
        console.log('Navigating to Main Page');
        return (<MainPage navigator={navigator}/>);
      }

      if(routeName == 'UserDataListView') {
          console.log('Navigating to UserDataListView Page');
          return (<UserDataListView navigator={navigator}/>);
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
