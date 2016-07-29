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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchListData } from './actions/action_list_data';

class MainPage extends Component {
  constructor(props) {
    super(props);
    console.log('MainPage constructor called');

  }

  componentDidMount() {
      console.log('Mainpage componentDidMount');

      AsyncStorage.getItem('accessToken', (err, accessToken) => {
          console.log('Access token fetched');
          this.fetchListData(accessToken);
      })

  }

  render() {
      if(!this.props.listDataResponse.isFetching && this.props.listDataResponse.isCompleted) {
          console.log('Data received');
          console.log(JSON.stringify(this.props.listDataResponse.listData));
      }

    return(
        <View>
            <Text> Welcome here </Text>
        </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchListData: fetchListData}, dispatch);
}

function mapStateToProps(state) {
    return {listData: state.listData};
}

AppRegistry.registerComponent('MainPage', () => MainPage);
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
