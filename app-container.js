'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
  Text,
  View,
  StyleSheet
} = ReactNative;

var AppContainer = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'feed'
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Tabs coming soon!</Text>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = AppContainer;
