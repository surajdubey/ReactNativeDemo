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
      <View style={{paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            {
              <View>
                <Text>{rowData.firstName}</Text>
                <Text>{rowData.lastName}</Text>
              </View>
            }
          }
          />
      </View>
    );
  }
}

AppRegistry.registerComponent('UserDataListView', () => UserDataListView);
module.exports = UserDataListView;
