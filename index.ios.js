/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native';

var Login = require('./login');
var AuthService = require('./auth-service');

var GithubBrowser = React.createClass({
  componentDidMount() {
    AuthService.getAuthInfo((error, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: !!authInfo
      })
    })
  },

  getInitialState() {
    return {
      isLoggedIn: false,
      checkingAuth: true
    }
  },

  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS style={styles.loader}
            animating={true}
            size="large" />
        </View>
      )
    }

    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Logged in</Text>
        </View>
      )
    } else {
      return (
        <Login onLogin={this.onLogin} />
      )
    }
  },

  onLogin() {
    this.setState({isLoggedIn: true})
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
