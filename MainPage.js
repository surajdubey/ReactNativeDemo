import React, {Component} from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Text,
  Navigator,
  View,
  ListView,
  ProgressBar
} from 'react-native';
import UserDataListView from './UserDataListView';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MainPage extends Component {
    constructor(props) {
        super(props);
        console.log('MainPage constructor called');
    }

    render() {
        return(
            <View>
                <Text> Welcome here</Text>
                <UserDataListView />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {listData: state.listDataResponse};
}

AppRegistry.registerComponent('MainPage', () => MainPage);
export default connect(mapStateToProps, null)(MainPage);
