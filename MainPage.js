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

  render() {

      if(!this.props.listData.isFetching && this.props.listData.isCompleted) {
        //ProgressBar should be dismissed here
        console.log('Data received');
        console.log(JSON.stringify(this.props.listData.listData));

        // var listData = this.props.listData.listData;
        var listData = this.props.listData.listData;
        return(
            <View>
                <Text> Welcome here</Text>
                <UserDataListView data={listData} />
            </View>
        );
      }

      if(this.props.listData.isFetching) {
          //Ideally ProgressBar should be displayed here
          return (
            <View>
                <Text>Data is loading</Text>
            </View>
        );
    }

    //to be called before API request is made
    return(
        <View>
            <Text>This is initial view before API call</Text>
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
