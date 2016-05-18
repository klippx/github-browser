'use strict';

var React = require('react');
var ReactNative = require('react-native');
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)

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
        <Icon.TabBarItemIOS title='Feed'
                        iconName='rss-square'
                        iconSize={30}
                        selected={this.state.selectedTab == 'feed'}
                        onPress={() => this.setState({selectedTab: 'feed'})}>
          <Text style={styles.welcome}>
            Feed
          </Text>
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
});

module.exports = AppContainer;
