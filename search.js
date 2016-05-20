'use strict';

var React = require('react');
var ReactNative = require('react-native');
var moment = require('moment');
var SearchResults = require('./search-result');

var {
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicatorIOS,
  TextInput,
  TouchableHighlight
} = ReactNative;

var Search = React.createClass({
  getInitialState() {
    return {
      query: null
    }
  },

  onSearchPressed() {
    this.props.navigator.push({
      title: 'Search results',
      component: SearchResults,
      passProps: {
        searchQuery: this.state.query
      }
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          onChangeText={text => this.setState({query: text})}
          placeholder="Search github" />
       <TouchableHighlight style={styles.button}>
         <Text style={styles.buttonText}
               onPress={this.onSearchPressed}>
           Search
         </Text>
       </TouchableHighlight>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 10,
    alignItems: 'center'
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#888'
  },
  button: {
    alignSelf: 'stretch',
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#484ecc'
  },
  buttonText: {
    fontSize: 22,
    alignSelf: 'center',
    color: 'white'
  },
});

module.exports = Search;
