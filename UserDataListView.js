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
        console.log(JSON.stringify(this.props));

        var listDataArray = this.props.listData;
        console.log(listDataArray);
        // this.state = {
        //   dataSource: ds.cloneWithRows(listDataArray),
        //   listValues : listDataArray,
        // };
    }

    componentDidMount() {
        console.log('inside componentDidMount');
    }

    render() {

        if(this.props.listData.isFetchingForDeletion==false &&
            this.props.listData.isCompletedForDeletion==true) {
            //delete retrieved rowID
            console.log('inside delete condition');
            var rowID = this.props.rowIDToDelete;
            console.log('rowID ' + rowID);
            // this.props.deleteListDataResponse(this.props.listData.rowID);
        }

        return (
            <View>
                <ListView
                  dataSource={ds.cloneWithRows(this.props.listData)}
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
        console.log('rowID deleteListData ' + rowID);
        this.props.deleteListData(this.props.listData, rowID);
    }

    deleteSelectedRowFromState(rowID) {

        //send action to reducer to update this state
        //it will return updated list data which will be rendered

    }
}

var styles = StyleSheet.create({
    listItem: {
        margin: 20,
    }
});

function mapStateToProps(state) {
    return { listData: state.listDataResponse.listData.array,
                rowIDToDelete: state.listDataResponse.rowIDToDelete}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteListData: deleteListData }, dispatch);
}

AppRegistry.registerComponent('UserDataListView', () => UserDataListView);
export default connect(mapStateToProps, mapDispatchToProps)(UserDataListView);
