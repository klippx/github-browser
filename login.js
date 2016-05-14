'use strict';

var React = require('react');
var ReactNative = require('react-native');
var Buffer = require('buffer');

var {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = ReactNative;

var Login = React.createClass({

  getInitialState() {
    return {
      showProgress: false
    }
  },

  render() {
    var errorCtrl = <View />;
    if (!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        That username and password did not work!
      </Text>
    }
    if (!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        We experienced an unexpected issue when logging in.
      </Text>
    }
    return (
        <View style={styles.container}>
          <Image style={styles.logo}
                 source={require('image!Aquicon-Github')} />
          <Text style={styles.heading}>
            Github Browser
          </Text>
          <TextInput style={styles.input}
                     onChangeText={text => this.setState({username: text})}
                     placeholder="Github username" />
          <TextInput style={styles.input}
                     onChangeText={text => this.setState({password: text})}
                     placeholder="Github password"
                     secureTextEntry={true} />
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}
                  onPress={this.onLoginPressed}>
              Log in
            </Text>
          </TouchableHighlight>

          {errorCtrl}

          <ActivityIndicatorIOS
              style={styles.loader}
              animating={this.state.showProgress}
              size="large" />
        </View>
    )
  },

  onLoginPressed() {
    this.setState({showProgress: true})

    var encodedAuth = new Buffer
      .Buffer(`${this.state.username}:${this.state.password}`)
      .toString('base64')

    fetch('https://api.github.com/user', {
      headers: { 'Authorization' : `Basic ${encodedAuth}` }
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    }).then(results => {
      this.setState({success: trues})
    }).catch(error => {
      this.setState(error)
    }).finally(()=> {
      this.setState({showProgress: false})
    })
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCF5FF',
    flex: 1,
    paddingTop: 40,
    padding: 10,
    alignItems: 'center'
  },
  logo: {
    width: 128,
    height: 128
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#484ecc'
  },
  heading: {
    fontSize: 40,
    marginTop: 10,
    fontFamily: 'Cochin'
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
  loader: {
    marginTop: 20
  },
  error: {
    marginTop: 20,
    color: 'red'
  }

});

module.exports = Login;
