import React, {Component} from 'react';
import {
    ListView, View, AppRegistry, Text, TouchableNativeFeedback, TouchableHighlight, StyleSheet
} from 'react-native';
import config from './config';
import { deleteListData } from './actions/action_list_data';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
var isDataDeleted = false;

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

        if(!this.props.listData.isFetching && this.props.listData.isCompleted && !isDataDeleted) {
            //delete retrieved rowID
            var rowID = this.props.listData.rowIDToDelete;
            deleteSelectedRowFromState(rowID);
        }

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
                onPress={() => this.sendDeleteRequest(rowID)}>
                <View style={styles.listItem}>
                    <Text>{rowData.data}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    sendDeleteRequest(rowID) {
        isDataDeleted = false;
        this.deleteListData(rowID);
    }

    deleteSelectedRowFromState(rowID) {
        var listData = this.state.listValues;
        listData.splice(rowID, 1);

        console.log('Updated Data ' + JSON.stringify(listData) );
        this.isDataDeleted = true;

        this.setState({
            dataSource: ds.cloneWithRows(listData),
            listData: listData
        });

    }
}

var styles = StyleSheet.create({
    listItem: {
        margin: 20,
    }
});

function mapStateToProps(state) {
    return { listData: state.listData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteListData: deleteListData }, dispatch);
}

AppRegistry.registerComponent('UserDataListView', () => UserDataListView);
export default connect(mapStateToProps, mapDispatchToProps)(UserDataListView);
