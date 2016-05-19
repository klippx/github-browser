'use strict';

var React = require('react');
var ReactNative = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
var Feed = require('./feed');

var {
  Text,
  View,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS
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
        <Icon.TabBarItemIOS title='Feed'
                        iconName='rss-square'
                        iconSize={30}
                        selected={this.state.selectedTab == 'feed'}
                        onPress={() => this.setState({selectedTab: 'feed'})}>
          <NavigatorIOS
            styles={styles.feedNavigation}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }} />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS title='Search'
                        iconName='search'
                        iconSize={30}
                        selected={this.state.selectedTab == 'search'}
                        onPress={() => this.setState({selectedTab: 'search'})}>
          <Text style={styles.welcome}>
            Search
          </Text>
        </Icon.TabBarItemIOS>
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
  feedNavigation: {
    flex: 1
  },
});

module.exports = AppContainer;
