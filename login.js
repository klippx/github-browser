'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableHighlight
} = React;

var Login = React.createClass({
  render() {
    return (
        <View style={styles.container}>
          <Image style={styles.logo}
                 source={require('image!Aquicon-Github')} />
          <Text style={styles.heading}>
            Github Browser
          </Text>
          <TextInput style={styles.input}
                     placeholder="Github username" />
          <TextInput style={styles.input}
                     placeholder="Github password"
                     secureTextEntry="true" />
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>
              Log in
            </Text>
          </TouchableHighlight>
        </View>
    )
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
  }
});

module.exports = Login;
