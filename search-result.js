'use strict';

var React = require('react');
var ReactNative = require('react-native');
var moment = require('moment');

var {
  Text,
  View,
  ListView,
  StyleSheet,
  Image
} = ReactNative;

var SearchResult = React.createClass({
  getInitialState() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    return {
      dataSource: dataSource,
      searchQuery: this.props.searchQuery
    }
  },

  componentDidMount() {
    console.log(`searching for ${this.state.searchQuery}`);
    this.doSearch(this.state.searchQuery)
  },

  doSearch(query) {
    require('./auth-service').getAuthInfo((err, authInfo) => {
      var url = `https://api.github.com/search/repositories/${query}`;
      fetch(url, { headers: authInfo.headers })
        .then(response => response.json())
        .then(responseData => {
          var pushEvents = responseData.filter(e => e.type === 'PushEvent');
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(pushEvents),
            showProgress: false
          })
        })
        .catch(console.error);
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          You searched for {this.state.searchQuery}
        </Text>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  row_container: {
    flex: 1,
    justifyContent: 'center',
    borderColor: '#d7d7d7',
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    padding: 10
  },
  bold: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  },
  commits: {
    paddingTop: 40,
    fontSize: 20
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60
  }
});

module.exports = SearchResult;
