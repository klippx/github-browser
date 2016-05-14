'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
  Text,
  View,
  StyleSheet,
  TabBarIOS
} = ReactNative;

var AppContainer = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'feed'
    }
  },

  render() {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item title='Feed'
                        icon={require('image!rss-feed')}
                        selected={this.state.selectedTab == 'feed'}
                        onPress={() => this.setState({selectedTab: 'feed'})}>
          <Text style={styles.welcome}>
            Feed
          </Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Search'
                        icon={require('image!magnifying-glass')}
                        selected={this.state.selectedTab == 'search'}
                        onPress={() => this.setState({selectedTab: 'search'})}>
          <Text style={styles.welcome}>
            Search
          </Text>
        </TabBarIOS.Item>
      </TabBarIOS>
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
