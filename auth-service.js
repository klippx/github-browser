'use strict';

var Buffer = require('buffer');

class AuthService {
  login(credentials, cb) {
    var encodedAuth = new Buffer
      .Buffer(`${credentials.username}:${credentials.password}`)
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
      return cb({success: trues})
    }).catch(error => {
      return cb(error)
    }).finally(()=> {
      return cb({showProgress: false})
    })
  }
}

module.exports = new AuthService;
