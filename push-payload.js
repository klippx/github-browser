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
      dataSource: dataSource
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={{uri: this.props.pushEvent.actor.avatar_url}}
        />
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
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60
  }
});

module.exports = PushPayload;
