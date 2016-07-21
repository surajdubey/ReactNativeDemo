import React, {Component} from 'react';
import {
    ListView, View, AppRegistry, Text
} from 'react-native';
import config from './config';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});

class UserDataListView extends Component {

    constructor(props) {
        super(props);

        var testData = [{"data":"Data 1"},
                        {"data":"Data 2"},
                        {"data":"Data 3"}];
        this.state = {
          dataSource: ds.cloneWithRows(testData)
        };
    }

    componentDidMount() {
        this.fetchListData();
    }

    render() {
        return (
            <View>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  />
            </View>
        );
    }

    renderRow(rowData) {
      return (
          <View>
            <Text>{rowData.data}</Text>
          </View>
      );
    }

    fetchListData() {
        console.log('fetching list data');
        var url = config.END_POINT + "dummy_list_data";
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.handleListData(responseData)
        })
        .catch((error) => {console.log(error)})
        .done();
    }

    handleListData(listData) {
        this.setState({
            dataSource: ds.cloneWithRows(listData.array)
        });
    }
}

AppRegistry.registerComponent('UserDataListView', () => UserDataListView);
module.exports = UserDataListView;
