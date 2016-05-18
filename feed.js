'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
  Text,
  View,
  ListView,
  StyleSheet
} = ReactNative;

var Feed = React.createClass({
  getInitialState() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    return {
      dataSource: dataSource.cloneWithRows(['A', 'B', 'C'])
    }
  },

  renderRow(rowData) {
    return <Text style={styles.listViewRow}>
      {rowData}
    </Text>
  },

  render() {

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          />
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  listViewRow: {
    color: '#333',
    alignSelf: 'center'
  }
});

module.exports = Feed;
