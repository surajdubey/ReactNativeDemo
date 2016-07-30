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
        var listDataArray = this.props.data.array;
        console.log(listDataArray);
        this.state = {
          dataSource: ds.cloneWithRows(listDataArray),
          listValues : listDataArray
        };
        this.deleteSelectedRowFromState = this.deleteSelectedRowFromState.bind(this);
    }

    componentDidMount() {
        console.log('inside componentDidMount');
    }

    render() {

        if(this.props.listData.isFetchingForDeletion==false &&
            this.props.listData.isCompletedForDeletion==true && isDataDeleted==false) {
            //delete retrieved rowID
            console.log('inside delete condition');
            var rowID = this.props.listData.rowIDToDelete;
            console.log('rowID ' + rowID);
            this.deleteSelectedRowFromState(rowID);
        }

        // if(isDataDeleted) {
        //     return(<View>
        //         <Text> Background operation </Text>
        //         </View>)
        // }

        if(isDataDeleted) {
        return (
            <View>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  />
            </View>
        )};

        return(
            <View>
                <Text> This is initial state </Text>
            </View>
        )
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
        this.props.deleteListData(rowID);
    }

    deleteSelectedRowFromState(rowID) {

        //send action to reducer to update this state
        //it will return updated list data which will be rendered
        var listData = this.state.listValues;
        listData.splice(rowID, 1);

        console.log('Updated Data ' + JSON.stringify(listData) );
        isDataDeleted = true;

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
    return { listData: state.listDataResponse }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteListData: deleteListData }, dispatch);
}

AppRegistry.registerComponent('UserDataListView', () => UserDataListView);
export default connect(mapStateToProps, mapDispatchToProps)(UserDataListView);
