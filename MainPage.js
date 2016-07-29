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

      AsyncStorage.getItem('accessToken', (err, accessToken) => {
          console.log('Access token fetched');
          this.props.fetchListData(accessToken);
      });
  }

  componentDidMount() {
      console.log('Mainpage componentDidMount')
  }

  render() {
      if(!this.props.listData.isFetching && this.props.listData.isCompleted) {
          console.log('Data received');
          console.log(JSON.stringify(this.props.listData.listData));
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
    return {listData: state.listDataResponse};
}

AppRegistry.registerComponent('MainPage', () => MainPage);
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
