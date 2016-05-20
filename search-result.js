'use strict';

var React = require('react');
var ReactNative = require('react-native');
var moment = require('moment');

var {
  Text,
  View,
  ListView,
  StyleSheet,
  Image
} = ReactNative;

var SearchResult = React.createClass({
  getInitialState() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    return {
      dataSource: dataSource,
      searchQuery: this.props.searchQuery
    }
  },

  renderRow(rowData) {
    return (
      <View style={styles.row_container}>
        <Text>
          <Text style={styles.bold}>
            {rowData.sha.substring(0,6)}
          </Text> - {rowData.message}
        </Text>
      </View>
    )
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          You searched for {this.state.searchQuery}
        </Text>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  row_container: {
    flex: 1,
    justifyContent: 'center',
    borderColor: '#d7d7d7',
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    padding: 10
  },
  bold: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  },
  commits: {
    paddingTop: 40,
    fontSize: 20
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60
  }
});

module.exports = SearchResult;
