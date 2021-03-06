'use strict';

var Buffer = require('buffer');
var ReactNative = require('react-native');
var _ = require('lodash');

var {
  AsyncStorage
} = ReactNative;

const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(cb) {
    AsyncStorage.multiGet([authKey, userKey], (error, value) => {
      if (error) { return cb(error) }
      if (!value) { return cb() }

      var zippedObj = _.zipObject(value);
      if (!zippedObj[authKey]) { return cb() }

      var authInfo = {
        header: {
          Authorization: `Basic ${zippedObj[authKey]}`
        },
        user: JSON.parse(zippedObj[userKey])
      }

      return cb(null, authInfo);
    })
  }

  login(credentials, cb) {
    var encodedAuth = new Buffer
      .Buffer(`${credentials.username}:${credentials.password}`)
      .toString('base64')

    fetch('https://api.github.com/user', { headers: { 'Authorization' : `Basic ${encodedAuth}` } })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        }
        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        }
      })
      .then(results => {
        AsyncStorage.multiSet([
          [authKey, encodedAuth],
          [userKey, JSON.stringify(results)]
        ], error => {
          if (error) { throw error }
          return cb({success: true})
        })
      }).catch(error => {
        return cb(error)
      }).finally(() => {
        return cb({showProgress: false})
      })
  }
}

module.exports = new AuthService;
