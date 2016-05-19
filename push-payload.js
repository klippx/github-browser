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

var PushPayload = React.createClass({
  getInitialState() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    return {
      dataSource: dataSource.cloneWithRows(this.props.pushEvent.payload.commits),
      pushEvent: this.props.pushEvent
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
        <Image
          style={styles.avatar}
          source={{uri: this.state.pushEvent.actor.avatar_url}}
        />

        <Text style={styles.text}>
          {moment(this.state.pushEvent.created_at).fromNow()}
        </Text>

        <Text>
          <Text style={styles.bold}>
            {this.state.pushEvent.actor.login}
          </Text> pushed
        </Text>

        <Text>
          to <Text style={styles.bold}>
            {this.state.pushEvent.payload.ref.replace('refs/heads/','')}
          </Text>
        </Text>

        <Text>
          at <Text style={styles.bold}>
            {this.state.pushEvent.repo.name}
          </Text>
        </Text>

        <Text style={styles.commits}>
          {this.state.pushEvent.payload.commits.length} commits
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
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

module.exports = PushPayload;
