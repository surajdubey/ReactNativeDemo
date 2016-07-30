import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Navigator,
  AsyncStorage
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';

import LoginPage from './LoginPage';
import MainPage from './MainPage';
import UserDataListView from './UserDataListView';

import rootReducer from './reducers';

const storeWithMiddleware = createStore(rootReducer, applyMiddleware(thunkMiddleware));

class ReactNativeDemo extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.log('Called componentWillMount');
        this.setState({'pageToRoute': ''});
        AsyncStorage.getItem('access_token', (error, accessToken) => {
            console.log('access token ' + accessToken);
          if(accessToken == null) {
              this.setState({'pageToRoute' : 'LoginPage'});
          } else {
              this.setState({'pageToRoute' : 'MainPage'});
          }
        });
    }

    render() {
        if(this.state.pageToRoute == 'null' || this.state.pageToRoute == '') {
            return (
                <View>
                    <Text>App is loading </Text>
                </View>
            );
        }

        //check if access token is available in AsyncStorage
        return (
          <Provider store={storeWithMiddleware}>
              <Navigator
                 style={{ flex:1 }}
                 initialRoute={{id: 'LoginPage', name: this.state.pageToRoute}}
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
