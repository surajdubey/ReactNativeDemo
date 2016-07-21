import React, {Component} from 'react';
import {
  ListView, View, AppRegistry, Text
} from 'react-native';

class UserDataListView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
    var testData = [{"firstName":"Black","lastName":"Garrett"},
                    {"firstName":"Morales","lastName":"Duncan"},
                    {"firstName":"Ramos","lastName":"King"}];
    this.state = {
      dataSource: ds.cloneWithRows(testData)
    };
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
            <Text>{rowData.firstName}</Text>
          </View>
      );
  }
}

AppRegistry.registerComponent('UserDataListView', () => UserDataListView);
module.exports = UserDataListView;
