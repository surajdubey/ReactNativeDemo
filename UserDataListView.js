import React, {Component} from 'react';
import {
    ListView, View, AppRegistry, Text, TouchableNativeFeedback, TouchableHighlight, StyleSheet
} from 'react-native';
import config from './config';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});

class UserDataListView extends Component {
    constructor(props) {
        super(props);

        var listDataArray = this.props.listData.array;
        this.state = {
          dataSource: ds.cloneWithRows(listDataArray),
          listValues : listDataArray
        };

    }

    render() {
        return (
            <View>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  />
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight
                onPress={() => this.deleteSelectedRow(rowID)}>
                <View style={styles.listItem}>
                    <Text>{rowData.data}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    deleteSelectedRow(rowID) {
        var listData = this.state.listValues;
        listData.splice(rowID, 1);

        console.log('Updated Data ' + JSON.stringify(listData) );
        this.setState({
            dataSource: ds.cloneWithRows(listData),
            listData: listData
        });
        // console.log(sectionID + ' ' + rowID + ' clicked ');
    }

}

var styles = StyleSheet.create({
    listItem: {
        margin: 20,
    }
});

AppRegistry.registerComponent('UserDataListView', () => UserDataListView);
module.exports = UserDataListView;
